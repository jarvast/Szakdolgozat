import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MaterialItemsModule } from './MaterialItemsModule';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from "@angular/common";
import localeHu from "@angular/common/locales/hu";
registerLocaleData(localeHu);
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { RouteGuard } from './route.guard';
import { MainComponent } from './pages/main/main.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { UploadFileService } from './upload/upload-file.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { WorkerListComponent } from './pages/worker-list/worker-list.component';
import { RatingComponent } from './pages/rating/rating.component';
import { RatingsService } from './services/ratings.service';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationService } from './services/location.service';
import { TruncatePipe } from './utils/TruncatePipe';
import { WorkerProfileComponent } from './pages/worker-profile/worker-profile.component';
import { TaskTableComponent } from './pages/task-table/task-table.component';
import { TasksService } from './services/tasks.service';
import { RatingDetailedComponent } from './pages/rating-detailed/rating-detailed.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditUserProfileComponent } from './pages/edit-user-profile/edit-user-profile.component';
import { EditWorkerProfileComponent } from './pages/edit-worker-profile/edit-worker-profile.component';
import { EditTasksComponent, DialogEditor, NewTaskDialog } from './pages/edit-tasks/edit-tasks.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { MessageService } from './services/message.service';
import { MessageDialog } from './pages/messages/popups/message-dialog/message-dialog';
import { WriteMessageDialogComponent } from './pages/messages/popups/write-message-dialog/write-message-dialog.component';
import { RatingDialogComponent } from './pages/messages/popups/rating-dialog/rating-dialog.component';
import { AppointmentDialogComponent } from './pages/messages/popups/appointment-dialog/appointment-dialog.component';
import { AppointmentService } from './services/appointment.service';
import { EditAppointmentsComponent, NewAppoDialog } from './pages/edit-appointments/edit-appointments.component';
import { ReportDialogComponent } from './pages/messages/popups/report-dialog/report-dialog.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterWorkerComponent } from './pages/register-worker/register-worker.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MainComponent,
    FormUploadComponent,
    WorkerListComponent,
    RatingComponent,
    LocationsComponent,
    TruncatePipe,
    WorkerProfileComponent,
    TaskTableComponent,
    RatingDetailedComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    EditWorkerProfileComponent,
    EditTasksComponent,
    DialogEditor,
    NewTaskDialog,
    MessageDialog,
    FavoriteListComponent,
    MessagesComponent,
    WriteMessageDialogComponent,
    RatingDialogComponent,
    AppointmentDialogComponent,
    EditAppointmentsComponent,
    NewAppoDialog,
    ReportDialogComponent,
    AdminDashboardComponent,
    RegisterUserComponent,
    RegisterWorkerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialItemsModule
  ],
  entryComponents: [DialogEditor, NewTaskDialog, MessageDialog, WriteMessageDialogComponent, RatingDialogComponent, AppointmentDialogComponent, NewAppoDialog, ReportDialogComponent],
  providers: [AuthService, RouteGuard, UploadFileService, UserService, CategoryService, RatingsService, AppointmentService, LocationService, TasksService, MessageService, 
    { provide: LOCALE_ID, useValue: 'hu' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
