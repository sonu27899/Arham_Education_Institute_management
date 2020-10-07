import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { exam_class } from '../classes/exam_class';
import { url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"exam/";
  private exam1=url.endPoints+"exam1/";
  private exam2=url.endPoints+"exam2/";

  addExam(item:exam_class)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }
  getExamById(id:number)
  {
    return this._http.get(this.url+id);
  }
  getExambyBatchStudentId(stu_id:number,batch_id:number)
  {
    return this._http.get(this.exam1+stu_id+'/'+batch_id);
  }
  getExamforResult(stu_id:number,batch_id:number)
  {
    console.log(stu_id,batch_id);
    return this._http.get(this.exam2+stu_id+'/'+batch_id);
  }
}
