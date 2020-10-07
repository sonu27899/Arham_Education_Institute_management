import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {todo_list_class} from '../../classes/todo_list_class';
import { Router, ActivatedRoute } from '@angular/router';
import {TodoHomeComponent} from '../todo-home/todo-home.component';
import { TodoService} from '../../services/todo.service';
@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {
  Todo_arr:todo_list_class[];
  flag:boolean=false;
  i:number;
  List_id:number;
  tmp_subject_data:todo_list_class;
  Topic:string;
  Faculty_id:number=0;
  Status:number=2;

  constructor(private _act:ActivatedRoute,private _ser:TodoService,private _router:Router,public dialogRef: MatDialogRef<TodoHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.Faculty_id=parseInt(localStorage.getItem('faculty_id'));
   }
  ngOnInit() {
    this.flag=true;
    this.List_id=this._act.snapshot.params["id"];
    this.List_id=this.data.id;
    this._ser.getTodoById(this.List_id).subscribe(
      (data:todo_list_class[])=>
      {
        this.tmp_subject_data=data[0];
        this.Topic=this.tmp_subject_data.Topic;
        //console.log(this.Size_name);
      }
    );
  }

  onclickUpdate()
  {
    //console.log("xyz");
    if(this.flag==true)
    {
      this._ser.updateTodo(new todo_list_class(this.Faculty_id,this.Topic,this.Status),this.List_id).subscribe(
        (data:any)=>
        {

          if(data.errno==1062)
          {
            alert('Already in Your List');
          }
          else
          {
            console.log(data);
            alert("List updated");
          }

          this.dialogRef.close();
          this._router.navigate(['menu/todo_home']);
        }

      );
    }

  }

  onclickCancle()
  {
    this.flag=false;
    if(this.flag==false)
  {
    this.dialogRef.close();
    this._router.navigate(['menu/todo_home']);
  }
  }


}
