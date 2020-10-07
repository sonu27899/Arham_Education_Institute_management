import { Component, OnInit } from '@angular/core';
import { student_answer_class } from '../classes/student_answer_class';
import { question_class } from '../classes/question_class';
import { result_class } from '../classes/result_class';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionPaperService } from '../services/question-paper.service';
import { QuestionService } from '../services/question.service';
import { StudentAnswerService } from '../services/student-answer.service';
import { ResultService } from '../services/result.service';
import { HostListener } from "@angular/core";


@Component({
  selector: 'app-view-answersheet',
  templateUrl: './view-answersheet.component.html',
  styleUrls: ['./view-answersheet.component.css']
})
export class ViewAnswersheetComponent implements OnInit {

  id:number;
  spinner_Flag=0;
  Question_arr:question_class[]=[];
  ind:number=0;
  SelectedOption:string[]=[];
  em:any;
  Student_answers:student_answer_class[]=[];
  marks:number=0;
  colors:string[]=[];
Student_id:number=0;
marks_obtained:number=0;
percentage:number=0;


// @HostListener('document:keydown', ['$event'])
// handleKeyboardEvent(event: KeyboardEvent) {
//     console.log(event);
//     event.returnValue = false;
//     event.preventDefault();
//     this.em.requestFullscreen();
// }



onclickDone()
{
  this._router.navigate(['/menu/result']);
}





  constructor(private act_router:ActivatedRoute,private qp_ser:QuestionPaperService,private question_ser:QuestionService,private stu_ans_ser:StudentAnswerService,private result_ser:ResultService,private _router:Router) { }










  ngOnInit(): void {


     this.id=this.act_router.snapshot.params["id"];
    console.log(this.id);
    this.Student_id=Number(localStorage.getItem('student_id'));
    this.stu_ans_ser.getStudentAnswer(this.Student_id,this.id).subscribe(
      (data:student_answer_class[])=>
      {
        this.Student_answers=data;
        console.log(this.Student_answers);
      }
    );




    this.result_ser.getResultById(this.Student_id,this.id).subscribe(
      (data:result_class)=>
      {
        console.log(data[0]);
        this.marks_obtained=data[0].Obtained_Marks;
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
                console.log(this.Question_arr);
                for(let j=0;j<this.Question_arr.length;j++)
                {
                  this.SelectedOption[j]=null;
                  this.colors[j]="red";
                  for(let k=0;k<this.Student_answers.length;k++)
                  {
                    if(this.Question_arr[j].Question_id==this.Student_answers[k].Question_id)
                    {
                      this.SelectedOption[j]=this.Student_answers[k].Answer_id;
                    }
                    if(this.Question_arr[j].Answer==this.Student_answers[k].Answer_id)
                    {
                      //this.SelectedOption[j]=this.Question_arr[j].Answer;
                      this.colors[j]="green";
                    }
                  }
                }
                if(this.Question_arr.length>0 && (this.Student_answers.length>0 || this.marks_obtained==0))
                {
                  this.spinner_Flag=1;
                  this.percentage=(this.marks_obtained*100)/(this.Question_arr.length*4)
                }

                console.log(this.Question_arr);
              }
            }
          );
        }

      }
    );

  }

}
