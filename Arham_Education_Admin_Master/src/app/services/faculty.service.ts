import { Injectable } from '@angular/core';
import {faculty_class} from '../classes/faculty_class';
import { HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private url= 'http://localhost:3000/faculty_login_admin/';
  private faculty='http://localhost:3000/faculty_admin/';
  private faculty_del='http://localhost:3000/faculty_del_admin/';
  private salary_date='http://localhost:3000/salaryinfo_admin/'
  constructor(private _http:HttpClient) { }
  login(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.url,body,{headers:_abc});
  }

  getAllFaculty()
  {

    return this._http.get(this.faculty);
  }

  getFacultyById(id)
  {
    console.log(id);
    return this._http.get(this.faculty+id);
  }


addFaculty(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.faculty,body,{headers:_header});
}

deleteFaculty(Faculty_id)
{
  return this._http.delete(this.faculty+Faculty_id);
}

updateFaculty(item,Faculty_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.faculty+Faculty_id,body,{headers:_header});
}

deleteAll(item:faculty_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.faculty_del,body,{headers:_abc});
}

getfacultySalaryLastDate(id)
{
  return this._http.get(this.salary_date+id);
}

}
