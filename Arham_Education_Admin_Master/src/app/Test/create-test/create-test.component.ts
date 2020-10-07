import { Component, OnInit } from '@angular/core';
import { batch_class } from '../../classes/batch_class';
import { BatchService } from '../../services/batch.service';
import { subject_class } from '../../classes/subject_class';
import { SubjectService } from '../../services/subject.service';
import { tag_class } from '../../classes/tag_class';
import { TagService } from '../../services/tag.service';
import { question_selection_class } from '../../classes/question_selection_class';
import { QuestionService } from '../../services/question.service';
import { ExamService } from '../../services/exam.service';
import { exam_class } from '../../classes/exam_class';
import { QuestionPaperService } from '../../services/question-paper.service';
import { question_paper_class } from '../../classes/question_paper_class';
import { questions_class } from '../../classes/questions_class';
import { difficulty_class } from '../../classes/difficulty_class';
import { Router } from '@angular/router';


export class tag_selection
{
  constructor(public tags:tag_class,public diff:difficulty_class[])
  {}
}


export class sub_selection
{
  constructor(public subject:subject_class,public total:number){}
}



@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  batch_list:batch_class[];
  batch_id:number;
  name:string="";
  subject_list:subject_class[];
  subject_obj:subject_class[]=[];
  tag_list:tag_class[]=[];
  tag_obj:tag_class[]=[];
  diff_id:number=0;
  tag_arr:tag_class[]=[];
  tag_selection_arr:tag_selection[]=[];
  sub_arr:subject_class[]=[];
  qty:number[]=[];
  count:number[]=[];
  question_select:question_selection_class[]=[];
  question_select1:question_selection_class[]=[];
  subject_selection:sub_selection[]=[];
  time:number;
total:number=0;
Faculty_id:number;
Exam_Date:Date;
  choice:string;
  Diffuclty_list:difficulty_class[]=[
    {Difficulty_id:1,Difficulty_name:"Easy"},
    {Difficulty_id:2,Difficulty_name:"Meduim"},
    {Difficulty_id:3,Difficulty_name:"Hard"},
  ];

  minDate=new Date(Date.now());
  maxDate = new Date(Date.now());
  max1Date=new Date(Date.now());



  constructor(private _route:Router,private batch_ser:BatchService,private subject_ser:SubjectService,private tag_ser:TagService,private ques_ser:QuestionService,private exam_ser:ExamService,private qp_ser:QuestionPaperService) { }

  Add_selection(item1:difficulty_class,i:number)
  {

    this.exam_ser.getCount(this.tag_selection_arr[i].tags.Tag_id,item1.Difficulty_id).subscribe(
      (data:any[])=>
      {
        this.question_select.push(new question_selection_class(this.tag_selection_arr[i].tags,item1,0,0,data[0].count));
      }
    )
    this.tag_selection_arr[i].diff.splice(this.tag_selection_arr[i].diff.indexOf(item1),1);
    console.log(this.question_select);
  }


  onClickdelete(item:question_selection_class)
  {
    console.log(item.tag.Name+" "+item.Difficulty.Difficulty_name);
    this.total-=item.qty;
    this.question_select.splice(this.question_select.indexOf(item),1);




    for(let i=0;i<this.tag_selection_arr.length;i++)
    {
      if(this.tag_selection_arr[i].tags==item.tag)
      {

        if(!this.tag_selection_arr[i].diff.find(x=>x==item.Difficulty))
        {
          this.tag_selection_arr[i].diff.push(item.Difficulty);
        }

      }
    }
    console.log(this.tag_selection_arr);

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
    if(this.choice=='Random')
    {

      this.subject_selection=[];
      for(let j=0;j<this.subject_obj.length;j++)
      {
        this.exam_ser.getCountbySubjectId(this.subject_obj[j].Subject_id).subscribe(
          (data:any[])=>
          {
            console.log(data);
            this.subject_selection.push(new sub_selection(this.subject_obj[j],data[0].Count));
          }
        );
      }

      console.log(this.subject_selection);
    }
    this.question_select=[];
    this.tag_arr=[];
    this.total=0;
    for(let i=0;i<this.tag_selection_arr.length;i++)
    {
      this.tag_selection_arr[i].diff=[];
    }
    console.log(this.question_select);
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

  onClickqtyChangerandom(item:sub_selection,i:number)
  {
    if(this.qty[i]>item.total)
    {
      alert("There are only "+item.total+" question available in Database");
      this.qty[i]=0;
      console.log(this.question_select);

      this.total=0;
      for(let j=0;j<this.qty.length;j++)
      {
        this.qty[j]=0;
      }



    }
    else if(this.qty[i]<0)
    {
      alert("Number of Questions can not be Less than 0");
      this.qty[i]=0;

      this.total=0;
      for(let j=0;j<this.question_select.length;j++)
      {
        this.qty[j]=0;
      }
    }
    else
    {
      console.log(this.qty);
      this.total=0;
      for(let j=0;j<this.qty.length;j++)
      {
        this.total+=this.qty[j];
      }

    }


  }
  onClickqtyChange(item:question_selection_class,i:number)
  {

    if(item.qty>item.total)
    {
      alert("There are only "+item.total+" question available in Database");
      this.question_select[i].qty=0;
      console.log(this.question_select);

      this.total=0;
      for(let j=0;j<this.question_select.length;j++)
      {
        this.question_select[j].qty=0;
      }



    }
    else if(item.qty<0)
    {
      alert("Number of Questions can not be Less than 0");
      this.question_select[i].qty=0;
      console.log(this.question_select);
      this.total=0;
      for(let j=0;j<this.question_select.length;j++)
      {
        this.question_select[j].qty=0;
      }
    }
    else
    {
      this.total=0;
      for(let j=0;j<this.question_select.length;j++)
      {
        this.total+=this.question_select[j].qty;
      }
    }





  }

  onclickAdd()
  {
    this.Faculty_id=Number(localStorage.getItem('faculty_id'));
    console.log(this.name);
    let exam_id=0;
    this.exam_ser.addExam(new exam_class(this.name,this.batch_id,this.total*4,this.time,this.Faculty_id,this.Exam_Date)).subscribe(
      (data:any)=>
      {

        if(data.errno==1062)
        {
         alert('Exam name already exits');
        }
        else
        {
          console.log(data);
          exam_id=data.insertId;
          if(this.choice=="Random")
          {
            for(let i=0;i<this.subject_obj.length;i++)
            {
              this.ques_ser.getRandomQuestion(this.subject_obj[i].Subject_id,this.qty[i]).subscribe(
                (data:questions_class[])=>
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
              this.ques_ser.getCustomeQuestion(this.question_select[l].tag.Tag_id,this.question_select[l].Difficulty.Difficulty_id,this.question_select[l].Count,this.question_select[l].qty).subscribe(
                (data:questions_class[])=>
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


      }
    );

    this._route.navigate(['menu/exam_home']);
  }

  subject_select()
  {
    console.log(this.subject_obj);
    this.tag_list=[];
    this.tag_arr=[];
    this.tag_selection_arr=[];
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
            this.tag_selection_arr.push(new tag_selection(data[j],[]));
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
     for(let j=0;j<3;j++)
     {
      this.exam_ser.getCount(this.tag_arr[i].Tag_id,j+1).subscribe(
        (data:any[])=>
        {
         this.question_select.push(new question_selection_class(this.tag_arr[i],this.Diffuclty_list[j],0,50,data[0].count));
        }
      );
     }



   }
   console.log(this.question_select);
  }



  onclickCancek()
  {
    this._route.navigate(['menu/exam_home']);
  }

  ngOnInit(): void {


    this.max1Date.setMonth(this.maxDate.getMonth()+1);
    this.maxDate=this.max1Date;


    this.batch_ser.getAllBatch().subscribe(
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
