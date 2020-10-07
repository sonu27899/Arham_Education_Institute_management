import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import {QuestionHomeComponent} from '../question-home/question-home.component';
import {AddquestionService } from '../../services/addquestion.service';
import {questions_class} from '../../classes/questions_class';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  Question_arr:questions_class[];
  Name:string;
  flag:boolean=false;
  i:number;
  Question_id:number;
  tmp_questions_data:questions_class;
   Question:string;
   Option1:string;
   Option2:string;
 Option3:string;
 Option4:string;
   Answer:string;
  constructor(private _act:ActivatedRoute,private _ser:AddquestionService,private _router:Router,public dialogRef: MatDialogRef<QuestionHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.flag=true;
    this.Question_id=this._act.snapshot.params["id"];
    this.Question_id=this.data.id;
    this._ser.getQuestionById(this.Question_id).subscribe(
      (data:questions_class[])=>
      {
        this.tmp_questions_data=data[0];
        this.Question=this.tmp_questions_data.Question;
        this.Option1=this.tmp_questions_data.Option1;
        this.Option2=this.tmp_questions_data.Option2;
        this.Option3=this.tmp_questions_data.Option3;
        this.Option4=this.tmp_questions_data.Option4;
        this.Answer=this.tmp_questions_data.Answer;
        //console.log(this.Size_name);
      }
    );
  }

  onclickCancle(){
    this.flag=false;
    if(this.flag==false)
    {
    this.dialogRef.close();
    this._router.navigate(['menu/question_home']);
    }
  }


  }


