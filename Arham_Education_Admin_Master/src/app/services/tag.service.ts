import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tag_class } from "../classes/tag_class";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private _http:HttpClient) { }
  private url="http://localhost:3000/tag_admin/";
  private tag="http://localhost:3000/tag1_admin/";
  getTagbySubjectId(id)
  {
    return this._http.get(this.url+id);
  }

  getAllTopics()
  {
    return this._http.get(this.tag);
  }

  getTopicById(id)
  {
    console.log(id);
    return this._http.get(this.tag+id);
  }


addTag(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.tag,body,{headers:_header});
}

deleteTopic(Tag_id)
{
  //console.log(Subject_id);
  return this._http.delete(this.tag+Tag_id);
}

updateTag(item,Tag_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.tag+Tag_id,body,{headers:_header});
}

deleteAll(item:tag_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.url,body,{headers:_abc});
}



}
