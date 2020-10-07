import { Injectable } from '@angular/core';
import {student_class} from '../classes/student_class';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { batch_class } from '.././classes/batch_class';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private student='http://localhost:3000/student_admin/';
  private student_del='http://localhost:3000/student_del_admin/';
  private studentAll='http://localhost:3000/student_login_admin/';
  constructor(private _http:HttpClient) { }



  updateStudentStatus(item:batch_class)
  {
    let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.studentAll,body,{headers:_header});
  }


  getAllStudent()
  {

    return this._http.get(this.studentAll);
  }

  getStudentById(id)
  {
    console.log(id);
    return this._http.get(this.student+id);
  }

  getStudentByBatchId(batch_id)
  {
    console.log(batch_id)
    return this._http.get(this.studentAll+batch_id);
  }

addStudent(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.student,body,{headers:_header});
}

deleteStudent(Student_id)
{
  return this._http.delete(this.student+Student_id);
}

updateStudent(item,Student_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.student+Student_id,body,{headers:_header});
}

deleteAll(item:student_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.student_del,body,{headers:_abc});
}


}
