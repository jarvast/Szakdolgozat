import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { WorkerUser } from '../../model/WorkerUser';
import { Server, Routes } from '../../utils/ServerRoutes';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../model/Location';
import { UserUser } from '../../model/UserUser';
import { WriteMessageDialogComponent } from '../messages/popups/write-message-dialog/write-message-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppointmentDialogComponent } from '../messages/popups/appointment-dialog/appointment-dialog.component';
import { ReportDialogComponent } from '../messages/popups/report-dialog/report-dialog.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit {
  workerId: number;
  worker : WorkerUser;
  imgRoute: String;
  locations : Location[];
  ownprofile: boolean = false;
  cachebuster: number;
  isUser: boolean = false;
  favorites: WorkerUser[] =[];
  isFavorite: boolean;

  constructor(public dialog : MatDialog,private route: ActivatedRoute,private snackbar: MatSnackBar, private userService: UserService, private authService: AuthService, private locationService: LocationService, private router:Router) { 
    this.imgRoute = Server.routeTo(Routes.PICTURE);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn && this.authService.user.role.role=="USER"){
      this.isUser= true;
      this.userService.listFavorites().subscribe(fav =>{
        this.favorites = fav;
      });
    }
    this.route.params.subscribe(param => {
      this.workerId = param['id'];
      this.userService.getWorker(this.workerId).subscribe(data =>{
        this.worker=data;
        this.isFavorite=false;
        for (let entry of this.favorites){
          if (entry.id==this.worker.id){
            this.isFavorite=true;
            break;
          }
        }
        if (this.authService.user.id==this.workerId){
          this.ownprofile=true;
        }
      });
  });
  this.locationService.getLocations(this.workerId).subscribe(res => {
    this.locations = res;
  });
  this.cachebuster= Date.now();
  }
  writeMessage(){
    let dialogRefa = this.dialog.open(WriteMessageDialogComponent, {
      width: '30%',
      data :{receiver:this.worker}
    });
    dialogRefa.afterClosed().subscribe(res =>{
    })
  }
  favorite(){
    this.userService.putFavorite(this.workerId).subscribe(res =>{
      this.userService.listFavorites().subscribe(fav =>{
        this.favorites = fav;
      });
      this.isFavorite=true;
    });
    this.userService.listFavorites().subscribe(fav =>{
      this.favorites = fav;
    });
  }
  notFavorite(){
    this.userService.notFavorite(this.workerId).subscribe(res =>{
      this.userService.listFavorites().subscribe(fav =>{
        this.favorites = fav;
      });
      this.isFavorite = false;
    });
  }
  report(){
    let dialogRefa = this.dialog.open(ReportDialogComponent, {
      width: '30%',
      data :{receiver:this.worker}
    });
    dialogRefa.afterClosed().subscribe(res =>{
    })
  }
  reservation(){
    let dialogRefa = this.dialog.open(AppointmentDialogComponent, {
      width: '30%',
      data :{receiver:this.worker}
    });
    dialogRefa.afterClosed().subscribe(res =>{
    })
  }
  editProfile(){
    this.router.navigate(['/myworker', this.worker.id]);
  }
  getTimeStamp(){
    return this.cachebuster;
  }
}
