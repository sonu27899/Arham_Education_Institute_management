import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { questions_class } from "../classes/questions_class";
@Injectable({
  providedIn: 'root'
})
export class AddquestionService {
  private url= 'http://localhost:3000/question_admin/';
  private questionBank='http://localhost:3000/questionBank_admin/';
  private facultyQuestion='http://localhost:3000/facultyQuestions_admin/';

  constructor(private _http:HttpClient) { }

  addQuestion(item:questions_class){
    let _headers=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_headers});
}


getAllQuestion()
{
  return this._http.get(this.questionBank);
}

getQuestionById(id)
{
  console.log(id);
  return this._http.get(this.questionBank+id);
}

getQuestionByFaculty(id)
{
  console.log(id);
  return this._http.get(this.facultyQuestion+id);
}


deleteQuestion(Question_id)
{
//console.log(Subject_id);
return this._http.delete(this.url+Question_id);
}

updateQuestion(item,Question_id)
{
let _header=new HttpHeaders().set('Content-Type','application/json');
let body=JSON.stringify(item);
console.log(body);
return this._http.put(this.url+Question_id,body,{headers:_header});
}

deleteAll(item:questions_class[])
{
let _abc=new HttpHeaders().set('Content-Type','application/json');
let body=JSON.stringify(item);
return this._http.post(this.questionBank,body,{headers:_abc});
}



}
