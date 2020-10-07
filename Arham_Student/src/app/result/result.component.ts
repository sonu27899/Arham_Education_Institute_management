import { Component, OnInit } from '@angular/core';
import { exam_class } from '../classes/exam_class';
import { LoginService } from '../services/login.service';
import { ExamService } from '../services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  student_id:number;
  student_email:string="";
  id:number;
  Batch_no:number=0;
  exams:any[];

  flag:number=0;
  constructor(private _ser:LoginService,public exam_ser:ExamService,private _ac:ActivatedRoute,private _router:Router) {
    this.student_email=localStorage.getItem('email_id');
    console.log(this.student_email);

   }

  ngOnInit(): void {
    this.student_id=Number(localStorage.getItem('student_id'));
    this._ser.getstudentById(this.student_email).subscribe((data:any)=>{
      console.log(data);
      this.Batch_no=data[0].Batch_no;
      this.exam_ser.getExamforResult(this.student_id,this.Batch_no).subscribe((data:any)=>{
        console.log(data);
        this.exams=data;
        console.log(this.exams);
      })
    });
  }

  onclickResult(exam:exam_class)
  {
    this.id=exam.Exam_id;
    this._router.navigate(['menu/view_answersheet/'+this.id]);

  }

}
