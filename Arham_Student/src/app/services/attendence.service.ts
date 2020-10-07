import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"attendence/";

  getAttendenceByStudentId(id:number)
  {
    return this._http.get(this.url+id);
  }
}
