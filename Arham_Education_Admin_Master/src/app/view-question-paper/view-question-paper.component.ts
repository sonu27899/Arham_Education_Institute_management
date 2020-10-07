import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { QuestionPaperService } from '../services/question-paper.service';
import { Router,ActivatedRoute} from "@angular/router";
import { view_paper_class } from '../classes/view_paper_class';

import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-view-question-paper',
  templateUrl: './view-question-paper.component.html',
  styleUrls: ['./view-question-paper.component.css']
})
export class ViewQuestionPaperComponent implements OnInit {
  Exam_id:number;
  Batch_name:string;
  Exam_name:string;
  Question:string;
  Option1:string;
  Option2:string;
  Option3:string;
  Option4:string;
  Answer:string;
  @ViewChild('htmlData') htmlData:ElementRef;
questions:view_paper_class[]=[];
  constructor(private _act:ActivatedRoute,private _ser:QuestionPaperService,private _router:Router) { }

  ngOnInit(): void {
    this.Exam_id = this._act.snapshot.params["Exam_id"];

    this._ser.getQuestionPaper_admin(this.Exam_id).subscribe((
      data:any)=>{
        console.log(data);
        this.questions=data;
        this.Batch_name=data[0].Batch_name;
        this.Exam_name=data[0].Exam_name;
        console.log(this.questions);
      }
    )
  }


  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }

  onclickCancle(){
    this._router.navigate(['menu/exam_home']);

  }
}

