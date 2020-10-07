import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { subject_class } from "../classes/subject_class";
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url= 'http://localhost:3000/subject_admin/';
  private sub_del='http://localhost:3000/subject_del_admin/';

  constructor(private _http:HttpClient) { }

  getAllSubject()
  {
    return this._http.get(this.url);
  }

  getSubjectById(id)
  {
    console.log(id);
    return this._http.get(this.url+id);
  }


addSubject(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.url,body,{headers:_header});
}

deleteSubject(Subject_id)
{
  console.log(Subject_id);
  return this._http.delete(this.url+Subject_id);
}

updateSubject(item,Subject_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.url+Subject_id,body,{headers:_header});
}

deleteAll(item:subject_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.sub_del,body,{headers:_abc});
}


}
