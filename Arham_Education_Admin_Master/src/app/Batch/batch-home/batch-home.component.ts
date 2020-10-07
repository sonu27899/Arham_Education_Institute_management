import { Component, OnInit,ViewChild } from '@angular/core';
import { BatchService } from '../../services/batch.service';
import { batch_class } from '../../classes/batch_class';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { BatchAddComponent } from '../batch-add/batch-add.component';
import { BatchUpdateComponent } from '../batch-update/batch-update.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.css']
})
export class BatchHomeComponent implements OnInit {

  batch_arr:batch_class[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  batch_list:batch_class[]=[];
  batch_delarr:batch_class[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  Batch_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=true;
Faculty_type:number;
  constructor(private student_ser:StudentService,private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:BatchService,private route:Router) { }
  displayedColumns: string[] = ['Action1','Batch_name','Action'];
  ngOnInit() {
    this.flag=true;
    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);


//    localStorage.setItem('faculty_type',"0");


     this.route.navigate(['menu']);


    }


    this.flag=true;

    this._ser.getAllBatch().subscribe(
      (data:any)=>{
        console.log(data);
        this.Batch_dataSource.paginator=this.paginator;
        this.batch_arr=data;
        this.Batch_dataSource.data= data;
        this.Batch_dataSource.sort=this.sort;

  }
);
}

  Add_Batch()

  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(BatchAddComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
          console.log('the dailog was closed');
          this.ngOnInit();

        })
      });
  }
  Delete_Batch(item:batch_class) {

    if(confirm("Are You sure you want to Complete course for this Batch : "+item.Batch_name))
    {
      this.student_ser.updateStudentStatus(item).subscribe(
        (data:any)=>
        {
          console.log(data);

          this._ser.deleteBatch(item.Batch_id).subscribe((data: any) => {
            console.log(data);
            this.ngOnInit();
          });

        }
      );
    }


  }

  Batch_name_Update(item:batch_class)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(BatchUpdateComponent,{
        data: {id : item.Batch_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Batch_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.Batch_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.Batch_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Batch_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item:batch_class) {
    if (this.batch_delarr.find(x => x == item)) {
      this.batch_delarr.splice(this.batch_delarr.indexOf(item), 1);
    } else {
      this.batch_delarr.push(item);
    }
    console.log(this.batch_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.batch_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.batch_delarr.length; this.i++) {
        if (this.batch_list.find(x => x == this.batch_delarr[this.i])) {
          this.batch_list.splice(this.batch_list.indexOf(this.batch_delarr[this.i]), 1);
        }
      }
      this.Batch_dataSource.data = this.batch_list;
      this.ngOnInit();
    });
  }

}
