import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { questions_class } from '../classes/questions_class';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _http:HttpClient) { }

  private random_url="http://localhost:3000/question1_admin/";
  private question_url="http://localhost:3000/facultyQuestions_admin/";
  private custom_url="http://localhost:3000/question_admin/";
  private questionBank='http://localhost:3000/questionBank_admin/'

  getRandomQuestion(subject_id,limit)
  {
    return this._http.get(this.random_url+subject_id+'/'+limit+'/');
  }
  getCustomeQuestion(tag_id,difficulty,count,limit)
  {
    return this._http.get(this.custom_url+tag_id+'/'+difficulty+'/'+count+'/'+limit);
  }
  updateQuestionCount(item:questions_class)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.questionBank,body,{headers:_abc});
  }
  getQuestionByQuestioId(id:number)
  {
    return this._http.get(this.questionBank+id);
  }

}
