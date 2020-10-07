import { Component, OnInit } from '@angular/core';
import { InstructionComponent } from '../instruction/instruction.component';
import { LoginService } from '../services/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { exam_class } from '../classes/exam_class';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-available-test',
  templateUrl: './available-test.component.html',
  styleUrls: ['./available-test.component.css']
})
export class AvailableTestComponent implements OnInit {

  student_id:number;
  student_email:string="";
  currentdialog:MatDialogRef<any>=null;
  Batch_no:number=0;
  exams:exam_class[];
  destroy=new Subject<any>();
  flag:number=0;
  view_flag:number=0;
  constructor(private _ser:LoginService,public exam_ser:ExamService,public dialog: MatDialog,private _ac:ActivatedRoute) {
    this.student_email=localStorage.getItem('email_id');
    console.log(this.student_email);

   }

  ngOnInit(): void {
    this.student_id=Number(localStorage.getItem('student_id'));
    this._ser.getstudentById(this.student_email).subscribe((data:any)=>{
      console.log(data);
      this.Batch_no=data[0].Batch_no;
      this.exam_ser.getExambyBatchStudentId(this.student_id,this.Batch_no).subscribe((data:any)=>{
        console.log(data);
        this.exams=data;
        if(this.exams.length>0)
        {
          this.view_flag=1;
        }
        console.log(this.exams);
      })
    });
  }
  onclickexam(exam)
  {
    console.log(exam);
    this.flag=1;
    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
    const dialogRef = this.dialog.open(InstructionComponent, {
      width:"100%",
      data: {id : exam.Exam_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });

  });
  }
}
