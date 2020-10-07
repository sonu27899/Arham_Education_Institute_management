import { Component, OnInit,ViewChild } from '@angular/core';
import {SubjectService } from '../../services/subject.service';
import {subject_class} from '../../classes/subject_class';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { SubjectAddComponent } from '../subject-add/subject-add.component';
import {SubjectUpdateComponent } from '../subject-update/subject-update.component';

@Component({
  selector: 'app-subject-home',
  templateUrl: './subject-home.component.html',
  styleUrls: ['./subject-home.component.css']
})
export class SubjectHomeComponent implements OnInit {
  Subject_arr:subject_class[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  Subject_list:subject_class[]=[];
  Subject_delarr:subject_class[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  Subject_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  Faculty_type:number;
flag:boolean=true;
  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:SubjectService,private route:Router) { }
  displayedColumns: string[] = ['Action1','Subject_name','Action'];
  ngOnInit() {

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
//    localStorage.setItem('faculty_type',"0");
     this.route.navigate(['menu']);


    }
    this.flag=true;

    this.Subject_dataSource.sort=this.sort;
    this._ser.getAllSubject().subscribe(
      (data:any)=>{
        console.log(data);
        this.Subject_dataSource.paginator=this.paginator;
        this.Subject_arr=data;
        this.Subject_dataSource.data= data;
        this.Subject_dataSource.sort=this.sort;

  }
);
}

Add_Subject()

  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(SubjectAddComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
          console.log('the dailog was closed');
          this.ngOnInit();

        })
      });
  }
  Delete_Subject(item) {
    this._ser.deleteSubject(item.Subject_id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  Subject_name_Update(item:subject_class)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(SubjectUpdateComponent,{
        data: {id : item.Subject_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Subject_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.Subject_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.Subject_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Subject_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item:subject_class) {
    if (this.Subject_delarr.find(x => x == item)) {
      this.Subject_delarr.splice(this.Subject_delarr.indexOf(item), 1);
    } else {
      this.Subject_delarr.push(item);
    }
    console.log(this.Subject_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.Subject_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.Subject_delarr.length; this.i++) {
        if (this.Subject_list.find(x => x == this.Subject_delarr[this.i])) {
          this.Subject_list.splice(this.Subject_list.indexOf(this.Subject_delarr[this.i]), 1);
        }
      }
      this.Subject_dataSource.data = this.Subject_list;
      this.ngOnInit();
    });
  }

}

