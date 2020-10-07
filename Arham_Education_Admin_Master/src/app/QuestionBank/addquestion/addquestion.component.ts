import { Component, OnInit } from '@angular/core';
import { subject_class } from '../../classes/subject_class';
import { SubjectService } from '../../services/subject.service';
import { tag_class } from '../../classes/tag_class';
import { TagService } from '../../services/tag.service';
import { questions_class } from "../../classes/questions_class";
import {AddquestionService} from "../../services/addquestion.service";
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  registerForm: FormGroup;
  subject_list:subject_class[];
  subject_id:number=0;
  question:questions_class[];
  tag_list:tag_class[];
  tag_id:number=0;
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

  constructor(private subject_ser:SubjectService,private tag_ser:TagService,private AddquestionService:AddquestionService,private _route:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
    this.id=parseInt(localStorage.getItem('faculty_id'));

  }
  diff_select()
  {
    console.log(this.diff_id);

  }


  onclickAdd()
  {
    console.log(this.Question);
    console.log(this.Option1);
    console.log(this.Option2);
    console.log(this.Option3);
    console.log(this.Option4);
    console.log(this.Answer);
    console.log(this.subject_id);
    console.log(this.tag_id);
    console.log(this.diff_id);
    console.log(this.count);

    this.AddquestionService.addQuestion(new questions_class(this.tag_id,this.diff_id,this.Question,this.Option1,this.Option2,this.Option3,this.Option4,this.Answer,this.count,this.id))
    .subscribe((data:any)=>{
      console.log(data);
      this._route.navigate(['menu/question_home']);
    });


  }


  subject_select()
  {
    console.log(this.subject_id);
    this.tag_ser.getTagbySubjectId(this.subject_id).subscribe(
      (data:tag_class[])=>
      {
        console.log(data);
        this.tag_list=data;
      }
    );
  }

  tag_select()
  {
    console.log(this.tag_id);
  }

  ngOnInit(): void {

    this.subject_ser.getAllSubject().subscribe(
      (data:subject_class[])=>
      {
        console.log(data);
        this.subject_list=data;
      }
    );

  }

  onclickCancle()
  {
    this._route.navigate(['menu/question_home']);
  }


}


