import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddquestionComponent } from './QuestionBank/addquestion/addquestion.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule} from '@angular/material/card';
import { MenuComponent } from './menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AnnoucementHomeComponent } from './annoucement/annoucement-home/annoucement-home.component';
import { AnnoucementAddComponent } from './annoucement/annoucement-add/annoucement-add.component';
import { AnnoucementUpdateComponent } from './annoucement/annoucement-update/annoucement-update.component';
import { FacultyHomeComponent } from './Faculty/faculty-home/faculty-home.component';
import { FacultyAddComponent } from './Faculty/faculty-add/faculty-add.component';
import { FacultyUpdateComponent } from './Faculty/faculty-update/faculty-update.component';
import { SubjectHomeComponent } from './Subject/subject-home/subject-home.component';
import { BatchHomeComponent } from './Batch/batch-home/batch-home.component';
import { BatchAddComponent } from './Batch/batch-add/batch-add.component';
import { BatchUpdateComponent } from './Batch/batch-update/batch-update.component';
import { SubjectAddComponent } from './Subject/subject-add/subject-add.component';
import { SubjectUpdateComponent } from './Subject/subject-update/subject-update.component';
import { StudentHomeComponent } from './Student/student-home/student-home.component';
import { StudentAddComponent } from './Student/student-add/student-add.component';
import { StudentUpdateComponent } from './Student/student-update/student-update.component';
import { TagHomeComponent } from './Tag/tag-home/tag-home.component';
import { TagAddComponent } from './Tag/tag-add/tag-add.component';
import { TagUpdateComponent } from './Tag/tag-update/tag-update.component';
import { TodoHomeComponent } from './Todo/todo-home/todo-home.component';
import { TodoAddComponent } from './Todo/todo-add/todo-add.component';
import { TodoUpdateComponent } from './Todo/todo-update/todo-update.component';
import { QuestionHomeComponent } from './QuestionBank/question-home/question-home.component';
import { QuestionUpdateComponent } from './QuestionBank/question-update/question-update.component';
import { QuestionViewComponent } from './QuestionBank/question-view/question-view.component';
import { CreateTestComponent } from './Test/create-test/create-test.component';
import { ExamHomeComponent } from './Test/exam-home/exam-home.component';
import { FeesHomeComponent } from './Fees/fees-home/fees-home.component';
import { FeesPayComponent } from './Fees/fees-pay/fees-pay.component';
import { Page404Component } from './PageNotFound/page404/page404.component';
import { FacultySalaryComponent } from './Faculty/faculty-salary/faculty-salary.component';
import { FacultyProfileComponent } from './Faculty/faculty-profile/faculty-profile.component';
import { FacultyProfileUpdateComponent } from './Faculty/faculty-profile-update/faculty-profile-update.component';
import { AttendanceAddComponent } from './attendance/attendance-add/attendance-add.component';
import { AttendanceHomeComponent } from './attendance/attendance-home/attendance-home.component';
import { AttendanceDetailsComponent,HighlightedDatesComponent } from './attendance/attendance-details/attendance-details.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ViewQuestionPaperComponent } from './view-question-paper/view-question-paper.component';
import { BatchResultComponent } from './batch-result/batch-result.component';

@NgModule({
  declarations: [
    AppComponent,
    AddquestionComponent,
    LoginComponent,
    MenuComponent,
    DashboardComponent,
    HighlightedDatesComponent,
    AnnoucementHomeComponent,
    AnnoucementAddComponent,
    AnnoucementUpdateComponent,
    FacultyHomeComponent,
    FacultyAddComponent,
    FacultyUpdateComponent,
    SubjectHomeComponent,
    BatchHomeComponent,
    BatchAddComponent,
    BatchUpdateComponent,
    SubjectAddComponent,
    SubjectUpdateComponent,
    StudentHomeComponent,
    StudentAddComponent,
    StudentUpdateComponent,
    TagHomeComponent,
    TagAddComponent,
    TagUpdateComponent,
    TodoHomeComponent,
    TodoAddComponent,
    TodoUpdateComponent,
    QuestionHomeComponent,
    QuestionUpdateComponent,
    QuestionViewComponent,
    CreateTestComponent,
    ExamHomeComponent,
    FeesHomeComponent,
    FeesPayComponent,
    Page404Component,
    FacultySalaryComponent,
    FacultyProfileComponent,
    FacultyProfileUpdateComponent,
    AttendanceAddComponent,
    AttendanceHomeComponent,
    AttendanceDetailsComponent,
    ForgetpasswordComponent,
    ChangepasswordComponent,
    ViewQuestionPaperComponent,
    BatchResultComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    BrowserModule,
    routing,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    LayoutModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
