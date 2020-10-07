import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnoucementAddComponent } from "./annoucement/annoucement-add/annoucement-add.component";
import {AnnoucementHomeComponent} from './annoucement/annoucement-home/annoucement-home.component';
import { AnnoucementUpdateComponent } from './annoucement/annoucement-update/annoucement-update.component';
import { FacultyHomeComponent } from './Faculty/faculty-home/faculty-home.component';
import { FacultyAddComponent } from './Faculty/faculty-add/faculty-add.component';
import { FacultyUpdateComponent } from './Faculty/faculty-update/faculty-update.component';
import { BatchAddComponent } from './Batch/batch-add/batch-add.component';
import { BatchUpdateComponent } from './Batch/batch-update/batch-update.component';
import { BatchHomeComponent } from './Batch/batch-home/batch-home.component';
import { SubjectHomeComponent } from './Subject/subject-home/subject-home.component';
import { SubjectAddComponent } from './Subject/subject-add/subject-add.component';
import { SubjectUpdateComponent } from './Subject/subject-update/subject-update.component';
import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { StudentAddComponent } from './Student/student-add/student-add.component';
import { StudentUpdateComponent } from './Student/student-update/student-update.component';
import { TodoHomeComponent } from './Todo/todo-home/todo-home.component';
import { TodoAddComponent } from './Todo/todo-add/todo-add.component';
import { TodoUpdateComponent } from './Todo/todo-update/todo-update.component';
import { TagHomeComponent } from './Tag/tag-home/tag-home.component';
import { TagAddComponent } from './Tag/tag-add/tag-add.component';
import { TagUpdateComponent } from './Tag/tag-update/tag-update.component';
import { QuestionHomeComponent } from './QuestionBank/question-home/question-home.component';
import { AddquestionComponent } from './QuestionBank/addquestion/addquestion.component';
import { QuestionUpdateComponent } from './QuestionBank/question-update/question-update.component';
import { QuestionViewComponent } from './QuestionBank/question-view/question-view.component';
import { CreateTestComponent } from './Test/create-test/create-test.component';
import { ExamHomeComponent } from './Test/exam-home/exam-home.component';
import { FeesHomeComponent } from './Fees/fees-home/fees-home.component';
import { FeesPayComponent } from './Fees/fees-pay/fees-pay.component';
 import { AuthservicesService } from './services/authservices.service';
import { Page404Component} from "./PageNotFound/page404/page404.component";
import { FacultySalaryComponent } from './Faculty/faculty-salary/faculty-salary.component';
import { FacultyProfileComponent } from './Faculty/faculty-profile/faculty-profile.component';
import { FacultyProfileUpdateComponent } from './Faculty/faculty-profile-update/faculty-profile-update.component';
import { AttendanceAddComponent } from './attendance/attendance-add/attendance-add.component';
import { AttendanceHomeComponent } from './attendance/attendance-home/attendance-home.component';
import { AttendanceDetailsComponent } from './attendance/attendance-details/attendance-details.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ViewQuestionPaperComponent } from './view-question-paper/view-question-paper.component';
import { BatchResultComponent } from './batch-result/batch-result.component';
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"***",redirectTo:''},
   {path:"menu",component:MenuComponent,children:[
    {path:'',component:DashboardComponent,canActivate:[AuthservicesService]},
    {path:"***",redirectTo:''},
    {path:'attedance_home',component:AttendanceHomeComponent,canActivate:[AuthservicesService]},
    {path:'attedance_details/:Student_id',component:AttendanceDetailsComponent,canActivate:[AuthservicesService]},
    {path:'add_attedance',component:AttendanceAddComponent,canActivate:[AuthservicesService]},
     {path:'announcement_home',component:AnnoucementHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_announcement',component:AnnoucementAddComponent,canActivate:[AuthservicesService]},
     {path:'update_announcement/:Announcement_id',component:AnnoucementUpdateComponent,canActivate:[AuthservicesService]},
     {path:'faculty_home',component:FacultyHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_faculty',component:FacultyAddComponent,canActivate:[AuthservicesService]},
     {path:'update_faculty/:Faculty_id',component:FacultyUpdateComponent,canActivate:[AuthservicesService]},
     {path:'profile_update/:Faculty_id',component:FacultyProfileUpdateComponent,canActivate:[AuthservicesService]},
     {path:'profile_faculty',component:FacultyProfileComponent,canActivate:[AuthservicesService]},
     {path:'batch_home',component:BatchHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_batch',component:BatchAddComponent,canActivate:[AuthservicesService]},
     {path:'update_batch/:Batch_id',component:BatchUpdateComponent,canActivate:[AuthservicesService]},
     {path:'subject_home',component:SubjectHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_subject',component:SubjectAddComponent,canActivate:[AuthservicesService]},
     {path:'update_subject/:Subject_id',component:SubjectUpdateComponent,canActivate:[AuthservicesService]},
     {path:'student_home',component:StudentHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_student',component:StudentAddComponent,canActivate:[AuthservicesService]},
     {path:'update_student/:Student_id',component:StudentUpdateComponent,canActivate:[AuthservicesService]},
     {path:'todo_home',component:TodoHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_todo',component:TodoAddComponent,canActivate:[AuthservicesService]},
     {path:'update_todo/:List_id',component:TodoUpdateComponent,canActivate:[AuthservicesService]},
     {path:'tag_home',component:TagHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_tag',component:TagAddComponent,canActivate:[AuthservicesService]},
     {path:'update_tag/:Tag_id',component:TagUpdateComponent,canActivate:[AuthservicesService]},
     {path:'question_home',component:QuestionHomeComponent,canActivate:[AuthservicesService]},
     {path:'add_question',component:AddquestionComponent,canActivate:[AuthservicesService]},
     {path:'update_question/:Question_id',component:QuestionUpdateComponent,canActivate:[AuthservicesService]},
     {path:'update_question/:Question_id',component:QuestionViewComponent,canActivate:[AuthservicesService]},
     {path:'test_home',component:CreateTestComponent,canActivate:[AuthservicesService]},
     {path:'exam_home',component:ExamHomeComponent,canActivate:[AuthservicesService]},
     {path:'fees_home',component:FeesHomeComponent,canActivate:[AuthservicesService]},
     {path:'salary_faculty',component:FacultySalaryComponent,canActivate:[AuthservicesService]},
     {path:'update_fees/:Student_id',component:FeesPayComponent,canActivate:[AuthservicesService]},
     {path:'view_paper/:Exam_id',component:ViewQuestionPaperComponent,canActivate:[AuthservicesService]},
     {path:'batch_result/:Exam_id',component:BatchResultComponent,canActivate:[AuthservicesService]}

   ]},
];

export const routing=RouterModule.forRoot(routes,{useHash:true});
