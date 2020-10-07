import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionPaperService } from '../services/question-paper.service';
import { question_class } from '../classes/question_class';
import { QuestionService } from '../services/question.service';
import { student_answer_class } from '../classes/student_answer_class';
import { StudentAnswerService } from '../services/student-answer.service';
import { ResultService } from '../services/result.service';
import { result_class } from '../classes/result_class';
import { student_exam_class } from '../classes/student_exam_class';
import { StudentExamService } from '../services/student-exam.service';
import { HostListener } from '@angular/core';



import { interval, Subscription } from 'rxjs';
import { ExamService } from '../services/exam.service';
import { exam_class } from '../classes/exam_class';

const MINIUES = 1000 * 60;

@Component({
  selector: 'app-live-exam',
  templateUrl: './live-exam.component.html',
  styleUrls: ['./live-exam.component.css']
})
export class LiveExamComponent implements OnInit {


  subscription: Subscription;

  id:number;
  exam_id:number;
  spinner_Flag=0;
  Question_arr:question_class[]=[];
  ind:number=0;
  SelectedOption:string;
  Student_answers:student_answer_class[]=[];
  marks:number=0;
  colors:string[]=[];
  hours:number=0;
  minutes:number=0;
  seconds:number=0;
  endTime:number=0;
  student_id:number;
  submit_flag:boolean=false;
  em:any;
  key_cnt:number=0;



@HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {

    this.key_cnt++;
    console.log(event);
    event.returnValue = false;
    event.preventDefault();

    if(this.key_cnt>2)
    {
      this.onClickSubmit();
    }
    else
    {
      alert((3-this.key_cnt)+"key press remaining");
      this.em.requestFullscreen();
    }


}


  onSaveNext()
  {
    if(this.ind<this.Question_arr.length)
    {
      this.Student_answers[this.ind].Question_id=this.Question_arr[this.ind].Question_id;
      this.Student_answers[this.ind].Answer_id=this.SelectedOption;
      if(this.SelectedOption!=null)
      {
        this.colors[this.ind]="primary";
      }
      else
      {
        this.colors[this.ind]="warn";
      }

      this.ind=this.ind+1;
    }
    else
    {
      this.onClickSubmit();
    }
    if(this.ind<this.Question_arr.length)
    {
      this.SelectedOption=this.Student_answers[this.ind].Answer_id;
    }

  }
  onPrevious()
  {
    if(this.ind>0)
    {
      this.ind=this.ind-1;
    }
    this.SelectedOption=this.Student_answers[this.ind].Answer_id;
  }

  onClickClear(ind:number)
  {
    console.log("in");
    this.Student_answers[this.ind].Question_id=this.Question_arr[this.ind].Question_id;
    this.Student_answers[this.ind].Answer_id=null;
    this.SelectedOption=null;
  }

  onClickSubmit()
  {
    this.submit_flag=true;
    this.seconds=0;
    this.minutes=0;
    this.hours=0;
    this.Student_answers[this.ind].Question_id=this.Question_arr[this.ind].Question_id;
    this.Student_answers[this.ind].Answer_id=this.SelectedOption;
    if(this.SelectedOption!=null)
    {
      this.colors[this.ind]="primary";
    }
    else
    {
      this.colors[this.ind]="warn";
    }
    let i=0;
    this.marks=0;
    for(i=0;i<this.Question_arr.length;i++)
    {
      if(this.Student_answers[i].Answer_id!=null)
      {
        this.stu_ans_ser.addStudentAnswer(new student_answer_class(this.Question_arr[i].Question_id,this.Student_answers[i].Answer_id,this.exam_id)).subscribe(
          (data:any)=>
          {
            console.log(data);

          }
        );
      }

      if(this.Question_arr[i].Answer==this.Student_answers[i].Answer_id)
      {
        this.marks+=4;
      }
    }
    if(i==this.Question_arr.length)
    {
      alert("Marks Obtained: "+this.marks);
      console.log(this.id);
      console.log(this.marks);
      this.result_ser.addStudentAnswer(new result_class(this.exam_id,this.marks)).subscribe(
        (data:any)=>
        {
          console.log(data);

          this._router.navigate(['menu/view_answersheet/'+this.id]);
          this.em.exitFullScreen();

        }
      );
    }
      console.log(this.Student_answers);
  }

  onClickPallette(i)
  {
    this.ind=i;
    this.SelectedOption=this.Student_answers[this.ind].Answer_id;
  }

  onClickOptionchange(ind)
  {
    console.log(ind+" "+this.SelectedOption);
  }

  changeTime(data)
  {

    if(this.seconds==0)
    {
      if(this.minutes==0)
      {
        if(this.hours==0)
        {
          this.subscription.unsubscribe();
          if(!this.submit_flag)
          {
            alert("Time's up");
            this.onClickSubmit();
          }
        }
        else
        {
          this.hours=this.hours-1;
          this.minutes=59;
          this.seconds=59;
        }
      }
      else
      {
        this.minutes=this.minutes-1;
        this.seconds=59;
      }
    }
    else
    {
      this.seconds--;
    }

  }

  constructor(private _router:Router,private act_router:ActivatedRoute,private qp_ser:QuestionPaperService,private question_ser:QuestionService,private stu_ans_ser:StudentAnswerService,private result_ser:ResultService,private stu_exam_ser:StudentExamService,private exam_ser:ExamService) { }

  ngOnInit(): void {

    this.em=document.documentElement;
    this.em.requestFullscreen();




    this.student_id=Number(localStorage.getItem('student_id'));
    console.log(this.student_id);

     this.id=this.act_router.snapshot.params["id"];
    console.log(this.id);

    this.exam_ser.getExamById(this.id).subscribe(
      (data:exam_class)=>
      {
      console.log(data);
      if(data[0].Time>=60)
      {
        this.hours=Math.trunc(data[0].Time/60);
      }
      else
      {
        this.hours=0;
      }

        console.log(this.hours);
        this.minutes=data[0].Time%60;
        console.log(this.minutes);
        this.endTime=data[0].Time;
        console.log(this.endTime);
        const source = interval(1000);
        this.subscription = source.subscribe(
          (data)=>
          {
            console.log(data);
            this.changeTime(data);
          }
        );
      }
    );





    this.stu_exam_ser.addStudentExam(new student_exam_class(this.student_id,this.id)).subscribe(
      (data:any)=>
      {

        this.exam_id=data.insertId;

      }
    );


    this.qp_ser.getQuestionPaper(this.id).subscribe(
      (data:question_class[])=>
      {
        console.log(data);
        let x=data.length;
        for(let i=0;i<data.length;i++)
        {
          this.question_ser.getQuestionByQuestioId(data[i].Question_id).subscribe(
            (data:question_class[])=>
            {
              console.log(data);
              this.Question_arr.push(data[0]);
              if(x==this.Question_arr.length)
              {
                this.spinner_Flag=1;
                console.log(this.Question_arr);
                for(let j=0;j<this.Question_arr.length;j++)
                {
                  this.Student_answers[j]=new student_answer_class(null,null);
                  this.colors[j]="";
                }
              }
            }
          );
        }

      }
    );

  }

}
