import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { question_paper_class } from '../classes/question_paper_class';
@Injectable({
  providedIn: 'root'
})
export class QuestionPaperService {

  constructor(private _http:HttpClient) { }

  private url="http://localhost:3000/question_paper_admin/";
  private paper="http://localhost:3000/viewQuestionPaper/"
  addQuestioPaper(item:question_paper_class)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }

  getQuestionPaper(id:number)
  {
    return this._http.get(this.url+id);
  }
  getQuestionPaper_admin(Exam_id:number){
    return this._http.get(this.paper+Exam_id);
  }

}
