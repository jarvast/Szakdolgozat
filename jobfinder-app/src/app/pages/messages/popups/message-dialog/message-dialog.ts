import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../../services/message.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Message } from '../../../../model/Message';
import { AuthService } from '../../../../services/auth.service';
import { UserUser } from '../../../../model/UserUser';
import { WorkerUser } from '../../../../model/WorkerUser';
import { WriteMessageDialogComponent } from '../write-message-dialog/write-message-dialog.component';
import { RatingsService } from '../../../../services/ratings.service';
import { Rating } from '../../../../model/Rating';
import { Router } from '@angular/router';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
    selector: 'message-dialog',
    templateUrl: 'message-dialog.html',
    styleUrls: ['./message-dialog.component.css']
  })
  export class MessageDialog implements OnInit{
  
    form: FormGroup;
    message: Message;
    isSent: boolean;
    isRateable : boolean = false;
    ratedBy: Rating[];
  
    constructor(
      private formBuilder: FormBuilder,
      private messageService: MessageService,
      private snackBar: MatSnackBar,
      private authService: AuthService,
      private ratingService: RatingsService,
      public dialog : MatDialog,
      private router: Router,
      public dialogRef: MatDialogRef<MessageDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.message = data.message;
        this.isSent = data.type;
        if (!this.isSent){
          this.messageService.seeMessage(this.message.id).subscribe(asd =>{
            console.log("seen")
          });
        }
        /*if (this.authService.user.role.role == "WORKER"){
          this.isWorker = true;
        }*/
        if (this.authService.user.role.role == "WORKER" && this.message.sender.role.role == "USER"){
          this.ratingService.getAllRatingsByWorker(this.authService.user.id).subscribe(data =>{
            this.ratedBy= data;
            for (let rater of this.ratedBy){
              if (rater.sender.id == this.message.sender.id){
                this.isRateable = false;
                console.log("false" + rater.sender.id + this.message.sender.id)
                break;
              }else{
                this.isRateable=true;
                console.log("true"  + rater.sender.id + this.message.sender.id)
              }
            }
            //this.isWorker = true;
          })
        }
       }
  
      ngOnInit(){
      }
      writeMessage(sender : UserUser | WorkerUser){
        let dialogRefa = this.dialog.open(WriteMessageDialogComponent, {
          width: '30%',
          //data: { id: task.id, name: task.taskName, prices: task.taskPrices, task: task }
          data :{receiver:sender}
        });
        dialogRefa.afterClosed().subscribe(res =>{
          this.dialogRef.close();
        })
      }
      requestRating(){
        if (this.message.receiver.role.role == "USER"){
          this.messageService.requestRating(this.message.receiver.id).subscribe(data =>{
            this.openSnackBarOk();
          });
        }else if (this.message.sender.role.role =="USER"){
          this.messageService.requestRating(this.message.sender.id).subscribe(data =>{
            this.openSnackBarOk();
          });
        }
      }
   openSnackBarOk() {
    this.snackBar.open('Az értékelési kérelmét elküldtük!','Rendben' ,{
      duration: 3000,
    });
  }
  profileLink(user: UserUser | WorkerUser){
    if (user.role.role== "WORKER"){
      this.router.navigate(['/worker', user.id]);
      this.dialogRef.close();
    }else{
      this.router.navigate(['/user', user.id]);
      this.dialogRef.close();
    }
  }
  rate(workerToRate: WorkerUser){
    console.log("workertorate" + workerToRate.name);
    let dialogRefa = this.dialog.open(RatingDialogComponent, {
      width: '30%',
      //data: { id: task.id, name: task.taskName, prices: task.taskPrices, task: task }
      data :{receiver:workerToRate}
    });
    dialogRefa.afterClosed().subscribe(res =>{
      this.dialogRef.close();
      this.messageService.delete(this.message.id).subscribe();
    })
  }
  
  }