import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url= url.endPoints+'student/';
  private url1= url.endPoints+'student1/';
  private exam=url.endPoints+'exam1/'
  private email_url= url.endPoints+'email/';

  constructor(private _http:HttpClient) { }
  log_in_stu(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.url,body,{headers:_abc});
  }
   changePassword(item:any)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url1,body,{headers:_abc});

  }
  sentMail(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.email_url,body,{headers:_abc});
  }

  getstudentById(id)
  {
    return this._http.get(this.url+id);
  }
  getStudentExam(id)
  {
    return this._http.get(this.exam+id);
  }
}
