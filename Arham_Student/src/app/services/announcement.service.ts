import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"announcement/";

  getAnnouncementByBatchId(batch_id:number)
  {
    return this._http.get(this.url+batch_id);
  }
}
