import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"student/";

  updateStudent(item)
  {
    console.log(item);
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }


}
