import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FeesService {

  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"fee/";

  getFeeByStudentId(id)
  {
    return this._http.get(this.url+id);
  }
}
