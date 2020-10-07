import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService} from '../../services/todo.service';
import {todo_list_class} from '../../classes/todo_list_class';
import { Router, ActivatedRoute } from '@angular/router';
import {TodoHomeComponent} from '../todo-home/todo-home.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  Todo_arr:todo_list_class[];
  Topic:string;
  Faculty_id:number=0;
  Status:number=1;
  flag:boolean=false;
  i:number;

  constructor(private _ser:TodoService,private _router:Router,private matDialog:MatDialogRef<TodoHomeComponent>,private _act:ActivatedRoute) {
    this.Faculty_id=parseInt(localStorage.getItem('faculty_id'));
   }


  ngOnInit() {
    this.flag=true;
  }

  onclickAdd()
  {
    if(this.flag==true)
    {

   this._ser.addTodo(new todo_list_class(this.Faculty_id,this.Topic,this.Status)).subscribe(
     (data:any)=>
     {
       if(data.errno==1062)
       {
        alert('list already exits');

       }
       else
       {
        console.log(data);
       }

       this._router.navigate(['menu/todo_home']);
       //this.currentdialog.close();
       this.matDialog.close();
     }
   );
  }
  }
 onclickCancle()
 {
  this.flag=false;
  if(this.flag==false)
  {
    console.log(this.flag);
    this.matDialog.close();
    this._router.navigate(['menu/todo_home']);
   //this._router.navigate(['menu/color_home']);

 }

 }


}
