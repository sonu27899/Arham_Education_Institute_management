import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { fees_class } from "../classes/fees_class";

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  constructor(private _http:HttpClient) { }
  private fees="http://localhost:3000/fees_admin/";
  private transaction="http://localhost:3000/transaction_admin/";
  getDetailsbyStudentId(id)
  {
    return this._http.get(this.fees+id);
  }

  getAllFeesDeatils()
  {
    return this._http.get(this.fees);
  }



addDetails(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.fees,body,{headers:_header});
}

getTrans()
{
  return this._http.get(this.transaction);
}


addsalary(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.transaction,body,{headers:_header});
}


}
