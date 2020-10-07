import { Injectable } from '@angular/core';
import {batch_class} from '../classes/batch_class';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatchService {


   private batch='http://localhost:3000/batch_admin/';
  private batch_del='http://localhost:3000/batch_del_admin/';
  private batch_result='http://localhost:3000/batch_result/';
  constructor(private _http:HttpClient) { }
  getAllBatch()
  {

    return this._http.get(this.batch);
  }

  getBatchResult(id)
  {
    return this._http.get(this.batch_result+id);
  }

  getBatchById(id)
  {
    console.log(id);
    return this._http.get(this.batch+id);
  }


addBatch(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.batch,body,{headers:_header});
}

deleteBatch(item)
{
  console.log(item)
  return this._http.delete(this.batch+item);
}

updateBatch(item,Batch_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.batch+Batch_id,body,{headers:_header});
}

deleteAll(item:batch_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.batch_del,body,{headers:_abc});
}


}
