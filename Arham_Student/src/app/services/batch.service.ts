import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private _http:HttpClient) { }

  private url=url.endPoints+"batch";

  getAllBatches()
  {
    return this._http.get(this.url);
  }
}
