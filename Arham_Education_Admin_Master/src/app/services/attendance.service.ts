import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { attendance_class } from '../classes/attendance_class';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {

  private attendance='http://localhost:3000/attendance_admin/';
  private status='http://localhost:3000/status/';
  constructor(private _http:HttpClient) { }

  addAttendance(item:attendance_class){
    console.log(item);
    let _header=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.attendance,body,{headers:_header});
  }

  attendance_status()
  {
    return this._http.get(this.status);
  }

  getStudentAttendanceByStudentId(student_id:number)
  {
    return this._http.get(this.attendance+student_id);
  }



}
