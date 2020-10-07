import { HttpClient,HttpHeaders } from "@angular/common/http";
import { exam_class } from '../classes/exam_class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private _http:HttpClient) { }

  private url="http://localhost:3000/exam_admin/";
  private url1="http://localhost:3000/exambybatch_admin/";

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
  examBybatch()
  {
    return this._http.get(this.url1);
  }
  getCount(tag_id:number,diff_id:number)
  {
    return this._http.get(this.url+'getCount/'+tag_id+'/'+diff_id);
  }
  getCountbySubjectId(sub_id:number)
  {
    return this._http.get(this.url+'getCount/'+sub_id);
  }
}
