import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { todo_list_class } from "../classes/todo_list_class";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private _http:HttpClient) { }
  private todo="http://localhost:3000/todo_admin/";
  private todo_del="http://localhost:3000/todo_del_admin/";
  getTodobyFacultyId(id)
  {
    return this._http.get(this.todo_del+id);
  }

  getAllTodo_list()
  {
    return this._http.get(this.todo);
  }

  getTodoById(id)
  {
    console.log(id);
    return this._http.get(this.todo+id);
  }


addTodo(item){
  console.log(item);
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.post(this.todo,body,{headers:_header});
}

deleteTodo(List_id)
{
  //console.log(Subject_id);
  return this._http.delete(this.todo+List_id);
}

updateTodo(item,List_id)
{
  let _header=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  console.log(body);
  return this._http.put(this.todo+List_id,body,{headers:_header});
}

deleteAll(item:todo_list_class[])
{
  let _abc=new HttpHeaders().set('Content-Type','application/json');
  let body=JSON.stringify(item);
  return this._http.post(this.todo_del,body,{headers:_abc});
}



}
