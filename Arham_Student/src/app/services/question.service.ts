import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { question_class } from '../classes/question_class';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  private random_url=url.endPoints+"question1/";
  private question_url=url.endPoints+"question2/";
  private custom_url=url.endPoints+"question/";

  getRandomQuestion(subject_id,limit)
  {
    return this._http.get(this.random_url+subject_id+'/'+limit+'/');
  }
  getCustomeQuestion(tag_id,difficulty,count,limit)
  {
    return this._http.get(this.custom_url+tag_id+'/'+difficulty+'/'+count+'/'+limit);
  }
  updateQuestionCount(item:question_class)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.custom_url,body,{headers:_abc});
  }
  getQuestionByQuestioId(id:number)
  {
    return this._http.get(this.question_url+id);
  }

}
