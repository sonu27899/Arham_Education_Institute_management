import { Component, OnInit,ViewChild } from '@angular/core';
import { TodoService} from '../../services/todo.service';
import {todo_list_class} from '../../classes/todo_list_class';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { TodoAddComponent } from '../todo-add/todo-add.component';
import {TodoUpdateComponent } from '../todo-update/todo-update.component';

@Component({
  selector: 'app-todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css']
})
export class TodoHomeComponent implements OnInit {
  Todo_arr:todo_list_class[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  Todo_list:todo_list_class[]=[];
  Todo_delarr:todo_list_class[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  Todo_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=true;
role:number=0;
id:number=0;
  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:TodoService,private route:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
    this.id=parseInt(localStorage.getItem('faculty_id'));
  }
  displayedColumns: string[] = ['Action1','Topic','Action'];

  ngOnInit() {

    this.flag=true;

    if(this.role==1)
    {
      this._ser.getAllTodo_list().subscribe(
        (data:any)=>{
          console.log(data);
          this.Todo_dataSource.paginator=this.paginator;
          this.Todo_dataSource.sort=this.sort;
          this.Todo_arr=data;
          this.Todo_dataSource.data= data;
          this.Todo_dataSource.sort=this.sort;

    }
  );
    }
    else
    {

      this._ser.getTodobyFacultyId(this.id).subscribe(
        (data:any)=>{
          console.log(data);
          this.Todo_dataSource.paginator=this.paginator;
          this.Todo_dataSource.sort=this.sort;
          this.Todo_arr=data;
          this.Todo_dataSource.data= data;
          this.Todo_dataSource.sort=this.sort;

        }
      );
    }
  }

  Add_todo()

  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(TodoAddComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
          console.log('the dailog was closed');
          this.ngOnInit();

        })
      });
  }
  Delete_Todo(item) {
    this._ser.deleteTodo(item.List_id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  Todo_Update(item:todo_list_class)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(TodoUpdateComponent,{
        data: {id : item.List_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Todo_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.Todo_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.Todo_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Todo_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item:todo_list_class) {
    if (this.Todo_delarr.find(x => x == item)) {
      this.Todo_delarr.splice(this.Todo_delarr.indexOf(item), 1);
    } else {
      this.Todo_delarr.push(item);
    }
    console.log(this.Todo_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.Todo_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.Todo_delarr.length; this.i++) {
        if (this.Todo_list.find(x => x == this.Todo_delarr[this.i])) {
          this.Todo_list.splice(this.Todo_list.indexOf(this.Todo_delarr[this.i]), 1);
        }
      }
      this.Todo_dataSource.data = this.Todo_list;
      this.ngOnInit();
    });
  }


}
