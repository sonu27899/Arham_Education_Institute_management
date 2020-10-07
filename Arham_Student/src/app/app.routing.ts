import { RouterModule, Routes } from '@angular/router';
import { CreateTestComponent } from "./create-test/create-test.component";
import { LiveExamComponent } from './live-exam/live-exam.component';
import { ViewAnswersheetComponent } from './view-answersheet/view-answersheet.component';
import { MenuComponent } from './menu/menu.component';
import { LogInComponent } from './log-in/log-in.component';
import { AvailableTestComponent } from './available-test/available-test.component';
import { ResultComponent } from './result/result.component';
import { FeesComponent } from './fees/fees.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthgardService } from './services/authgard.service';
const arr:Routes=[
  {path:'',component:LogInComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:'menu',component:MenuComponent,children:[
    {path:'',component:DashboardComponent,canActivate:[AuthgardService]},
    {path:'available-test',component:AvailableTestComponent,canActivate:[AuthgardService]},

    {path:'result',component:ResultComponent,canActivate:[AuthgardService]},
    {path:'view_answersheet/:id',component:ViewAnswersheetComponent,canActivate:[AuthgardService]},
    {path:'fees',component:FeesComponent,canActivate:[AuthgardService]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthgardService]},
    {path:'attendence',component:AttendenceComponent,canActivate:[AuthgardService]},
    {path:'announcement',component:AnnouncementComponent,canActivate:[AuthgardService]}
  ]},
  {path:'exam',component:CreateTestComponent,canActivate:[AuthgardService]},
  {path:'live_exam/:id',component:LiveExamComponent,canActivate:[AuthgardService]},
];

export const routing=RouterModule.forRoot(arr,{useHash:true});
