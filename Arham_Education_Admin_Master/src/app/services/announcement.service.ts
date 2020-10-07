import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { announcement_class } from '../classes/announcement_class';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private url= 'http://localhost:3000/announcement_admin/';
  private getbatch='http://localhost:3000/batch_admin/';
  private announcement_del= 'http://localhost:3000/announcement_del_admin/';

  constructor(private _http:HttpClient) { }
  getAllAnnouncement()
  {

    return this._http.get(this.url);
  }

  getAllAnnouncementById(id)
  {
    console.log(id);
    return this._http.get(this.url+id);
  }

getAllBatch()
  {

    return this._http.get(this.getbatch);
  }
getBathcId(name)
{
  return this._http.get(this.getbatch+name);
}
addAnnouncement(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.url,body,{headers:_header});
}

deleteAnnouncement(Announcement_id)
{
  return this._http.delete(this.url+Announcement_id);
}

updateAnnoucement(item,Announcemnet_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.url+Announcemnet_id,body,{headers:_header});
}

deleteAll(item:announcement_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.announcement_del,body,{headers:_abc});
}



}
