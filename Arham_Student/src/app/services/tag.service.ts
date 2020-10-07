import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {


  constructor(private _http:HttpClient) { }
  private url=url.endPoints+"tag/";

  getTagbySubjectId(id)
  {
    return this._http.get(this.url+id);
  }

}
