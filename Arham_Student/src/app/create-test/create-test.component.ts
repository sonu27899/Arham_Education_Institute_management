import { Component, OnInit } from '@angular/core';
import { batch_class } from '../classes/batch_class';
import { BatchService } from '../services/batch.service';
import { subject_class } from '../classes/subject_class';
import { SubjectService } from '../services/subject.service';
import { tag_class } from '../classes/tag_class';
import { TagService } from '../services/tag.service';
import { question_selection_class } from '../classes/question_selection_class';
import { QuestionService } from '../services/question.service';
import { ExamService } from '../services/exam.service';
import { exam_class } from '../classes/exam_class';
import { QuestionPaperService } from '../services/question-paper.service';
import { question_paper_class } from '../classes/question_paper_class';
import { question_class } from '../classes/question_class';
import { difficulty_class } from '../classes/difficulty_class';



@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  batch_list:batch_class[];
  batch_id:number=0;
  name:string="";
  subject_list:subject_class[];
  subject_obj:subject_class[]=[];
  tag_list:tag_class[]=[];
  tag_obj:tag_class[]=[];
  diff_id:number=0;
  tag_arr:tag_class[]=[];
  sub_arr:subject_class[]=[];
  qty:number[]=[];
  count:number[]=[];
  question_select:question_selection_class[]=[];
  time:number=0;
total:number=0;
  choice:string;
  Diffuclty_list:difficulty_class[]=[
    {Difficulty_id:1,Difficulty_name:"Easy"},
    {Difficulty_id:2,Difficulty_name:"Meduim"},
    {Difficulty_id:3,Difficulty_name:"Hard"},
  ];




  constructor(private batch_ser:BatchService,private subject_ser:SubjectService,private tag_ser:TagService,private ques_ser:QuestionService,private exam_ser:ExamService,private qp_ser:QuestionPaperService) { }

  onClickdelete(item)
  {
    this.question_select.splice(this.question_select.indexOf(item),1);
  }

  diff_select()
  {
    console.log(this.diff_id);

  }

  batch_select()
  {
    console.log(this.batch_id);
  }

  onChoiceChange()
  {
    console.log(this.choice);
    this.question_select=[];
  }

  onClickChange()
  {
    if (this.time< 0) {
      alert("Time can not less than 0");
      this.time = 0;
    }
    if(this.time>180)
    {
      alert("Item can not more than 180");
      this.time=180;
    }


  }

  onClickqtyChange()
  {
    this.total=0;
    for(let j=0;j<this.qty.length;j++)
    {
      this.total+=this.qty[j];
    }

  }

  onclickAdd()
  {
    console.log(this.name);
    let exam_id=0;
    this.exam_ser.addExam(new exam_class(this.name,this.batch_id,this.total*4,this.time,1)).subscribe(
      (data:any)=>
      {
        console.log(data);
        exam_id=data.insertId;
        if(this.choice=="Random")
        {
          for(let i=0;i<this.subject_obj.length;i++)
          {
            this.ques_ser.getRandomQuestion(this.subject_obj[i].Subject_id,this.qty[i]).subscribe(
              (data:question_class[])=>
              {
                console.log(data);
                for(let k=0;k<data.length;k++)
                {
                  this.qp_ser.addQuestioPaper(new question_paper_class(data[k].Question_id,exam_id)).subscribe(
                    (data1:any)=>
                    {
                      console.log(data1);
                    }
                  );
                  data[k].Count=data[k].Count+1;
                  this.ques_ser.updateQuestionCount(data[k]).subscribe(
                    (data2:any)=>
                    {
                      console.log(data2);
                    }
                  );
                }
              }
            );
          }
        }
        else
        {
          for(let l=0;l<this.question_select.length;l++)
          {
            this.ques_ser.getCustomeQuestion(this.question_select[l].tag.Tag_id,this.question_select[l].Difficulty.Difficulty_id,this.count[l],this.qty[l]).subscribe(
              (data:question_class[])=>
              {
                console.log(data);
                for(let k=0;k<data.length;k++)
                {
                  this.qp_ser.addQuestioPaper(new question_paper_class(data[k].Question_id,exam_id)).subscribe(
                    (data1:any)=>
                    {
                      console.log(data1);
                    }
                  );
                  data[k].Count=data[k].Count+1;
                  this.ques_ser.updateQuestionCount(data[k]).subscribe(
                    (data2:any)=>
                    {
                      console.log(data2);
                    }
                  );
                }
              }
            );
          }
        }


      }
    );


  }

  subject_select()
  {
    console.log(this.subject_obj);
    this.tag_list=[];
    this.tag_arr=[];
    this.question_select=[];
  for(let i=0;i<this.subject_obj.length;i++)
  {

    this.tag_ser.getTagbySubjectId(this.subject_obj[i].Subject_id).subscribe(
      (data:tag_class[])=>
      {
        // console.log(data);
        for(let j=0;j<data.length;j++)
        {
          if(!this.tag_list.find(x=>x.Tag_id==data[j].Tag_id))
          {
            this.tag_list.push(data[j]);
          }

        }
      }
    );
    // console.log(this.tag_arr);
  }
   console.log(this.tag_list);
  }


  onTagchanged(item:tag_class)
  {
   console.log(item);
   this.question_select=[];
   if(this.tag_arr.find(x=>x==item)){
     this.tag_arr.splice(this.tag_arr.indexOf(item),1);
   }
   else
   {
     this.tag_arr.push(item);
   }
   console.log(this.tag_arr);
   for(let i=0;i<this.tag_arr.length;i++)
   {
     this.question_select.push(new question_selection_class(this.tag_arr[i],this.Diffuclty_list[0],0,0));
     this.question_select.push(new question_selection_class(this.tag_arr[i],this.Diffuclty_list[1],0,0));
     this.question_select.push(new question_selection_class(this.tag_arr[i],this.Diffuclty_list[2],0,0));
   }
   console.log(this.question_select);
  }

  ngOnInit(): void {



    this.batch_ser.getAllBatches().subscribe(
      (data:batch_class[])=>
      {
        console.log(data);
        this.batch_list=data;
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
}
