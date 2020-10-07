import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { Router,ActivatedRoute} from "@angular/router";
import { subject_class } from '../../classes/subject_class';
import { SubjectService } from '../../services/subject.service';
import { tag_class } from '../../classes/tag_class';
import { TagService } from '../../services/tag.service';
import { questions_class } from "../../classes/questions_class";
import {AddquestionService} from "../../services/addquestion.service";
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.css']
})
export class QuestionUpdateComponent implements OnInit {

  subject_list:subject_class[];
  Subject_id:number=0;
  question:questions_class[];
  tag_list:tag_class[];
  Tag_id:number=0;
  diff_id:number=0;



     Question:string;
     Option1:string;
     Option2:string;
     Option3:string;
     Option4:string;
     Answer:string;
     count:number=1;
    role:number;
    id:number;
    Question_id:number;



    constructor(private _act:ActivatedRoute,private subject_ser:SubjectService,private tag_ser:TagService,private AddquestionService:AddquestionService,private _route:Router) {
      this.role=parseInt(localStorage.getItem('faculty_type'));
      this.id=parseInt(localStorage.getItem('faculty_id'));

    }

  ngOnInit() {
    this.Question_id = this._act.snapshot.params["Question_id"];
    console.log(this.Question_id);
    this.AddquestionService.getQuestionById(this.Question_id).subscribe(
      (data:questions_class[])=>{
        console.log(data);
        this.Tag_id=data[0].Tag_id;
        this.diff_id=data[0].Difficulty;
        this.Question=data[0].Question;
        this.Option1=data[0].Option1;
        this.Option2=data[0].Option2;
        this.Option3=data[0].Option3;
        this.Option4=data[0].Option4;
        this.Answer=data[0].Answer;
        this.count=data[0].Count;
        this.id=data[0].Faculty_id;
      }
    );

    this.subject_ser.getAllSubject().subscribe(
      (data:subject_class[])=>
      {
        console.log(data);
        this.subject_list=data;
      }
    );


  }
  subject_select()
  {
    console.log(this.Subject_id);
    this.tag_ser.getTagbySubjectId(this.Subject_id).subscribe(
      (data:tag_class[])=>
      {
        console.log(data);
        this.tag_list=data;
      }
    );
  }

  tag_select()
  {
    console.log(this.Tag_id);
  }

  onclickUpdate(){
    this.AddquestionService.updateQuestion(new questions_class(this.Tag_id,this.diff_id,this.Question,this.Option1,this.Option2,this.Option3,this.Option4,this.Answer,this.count,this.id),this.Question_id) .subscribe((data:any)=>{
      console.log(data);
      this._route.navigate(['menu/question_home']);
    });


  }

  onclickCancle()
  {
    this._route.navigate(['menu/question_home']);
  }

}
