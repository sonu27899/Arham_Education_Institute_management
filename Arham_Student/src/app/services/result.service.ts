import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { result_class } from '../classes/result_class';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"result/";

  addStudentAnswer(item:result_class)
  {
    console.log(item);
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }

  getAllResultById(stu_id:number)
  {
    return this._http.get(this.url+stu_id);
  }

  getResultById(Student_id:number,Exam_id:number)
  {
    return this._http.get(this.url+Student_id+'/'+Exam_id);
  }
}
