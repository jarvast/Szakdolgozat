import { Component, OnInit, Input } from '@angular/core';
import { UserUser } from '../../model/UserUser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Server, Routes } from '../../utils/ServerRoutes';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '../../model/Location';
import { LocationService } from '../../services/location.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent{

  //@Input() worker: UserUser;
  userId: number;
  imgRoute: String;
  locations : Location[];
  user: UserUser;
  editForm: FormGroup;
  selected: String;
  asd : number; /*= new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    loc: new FormControl('', [Validators.required])
  });*/

  constructor(private route: ActivatedRoute, private userService: UserService,private authService: AuthService, private locationService:LocationService, private fb:FormBuilder, private router: Router) {
    this.imgRoute = Server.routeTo(Routes.PICTURE);
    this.route.params.subscribe(param => {
      this.userId = param['id'];
      this.userService.getUser(this.userId).subscribe(res =>{
        this.user=res;
        this.locationService.getAllLocations().subscribe(res =>{
          this.locations=res;
        });
        this.editForm = this.fb.group({
          name: ['',Validators.required],
          phone: ['', Validators.required],
          email: ['', Validators.required],
          loc: ['',Validators.required]
        });
        this.editForm.patchValue({name: res.name, phone: res.phoneNum, email: res.email, loc: res.location});
        this.selected = res.location.locationName;
        console.log(this.selected);
      })
    });
    this.asd= Date.now();
    /*this.locationService.getAllLocations().subscribe(res =>{
      this.locations=res;
    });*/
    /*this.editForm = fb.group({
      name: fb.control('',Validators.required),
      phone: fb.control('',Validators.required),
      email: fb.control('',[Validators.required, Validators.email])
    });*/
      //loc: new FormControl(this.user.location.locationName, [Validators.required])
   // });
   // this.createForm(this.user);
   }
 
    /*this.route.params.subscribe(param => {
      this.userId = param['id'];
      this.userService.getUser(this.userId).subscribe(data =>{
        this.user=data;
      })
    });*/
    //this.editForm.patchValue({name: this.user.name});
    //this.editForm.setValue({name: this.user.name});
    //console.log(this.user.name);
    //this.formGro
   

  /*createForm(){
    this.editForm = this.fb.group({
      name: new FormControl('anyád', [Validators.required,Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      loc: new FormControl(this.user.location, [Validators.required])
    });
  }*/
  
  get name() {
    return this.editForm.get('name')
  }
  get phone() {
    return this.editForm.get('phone')
  }
  get email() {
    return this.editForm.get('email')
  }
  get loc() {
    return this.editForm.get('loc')
}

submit() {
  this.user.name=this.name.value;
  this.user.phoneNum=this.phone.value;
  this.user.email=this.email.value;
  this.user.location=this.loc.value;
  this.userService.updateUser(this.user).subscribe(res =>{
    this.router.navigate(['/user', this.userId]);
  });
  }
  getTimeStamp(){
   /* setTimeout(() => {
      
    }, 2000);*/
    return this.asd;
  }
}