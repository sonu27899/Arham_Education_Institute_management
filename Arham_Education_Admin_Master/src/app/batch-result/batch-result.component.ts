import { Component, OnInit,ViewChild } from '@angular/core';
import { BatchService } from '.././services/batch.service';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router,ActivatedRoute } from "@angular/router";
import {batch_result_class} from ".././classes/batch_result_class";

@Component({
  selector: 'app-batch-result',
  templateUrl: './batch-result.component.html',
  styleUrls: ['./batch-result.component.css']
})
export class BatchResultComponent implements OnInit {
  exam_tbl_arr:batch_result_class[]=[];
  j: number;
  flag:boolean;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  exam_selection = new SelectionModel(true, []);

  exam_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  expandedElement;
  arr:number[]=[];
  displayedColumns: string[] = [
    "name",
    "last_name",
    "Exam_name",
    "Date",
    "Marks",
    "Obtained_Marks",
    "Time"

  ];
Exam_id:number=0;
role:number=0;


  constructor(private _act:ActivatedRoute,private _ser:BatchService,private _router:Router) { }

  ngOnInit(): void {
    this.flag=true;
    this.Exam_id = this._act.snapshot.params["Exam_id"];

    this._ser.getBatchResult(this.Exam_id).subscribe(
      (data:any)=>{
        if(data.length!=0)
        {
          console.log(data);
          this.  exam_dataSource.paginator = this.paginator;
          this.  exam_dataSource.sort = this.sort;
          this.exam_tbl_arr=data;
          this.exam_dataSource.data=this.exam_tbl_arr;
          this.exam_dataSource.sort = this.sort;

        }
        else
        {
          this.flag=false;
        }

      }
    );

  }

  applyFilter(filterValue: string) {
    this.exam_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.exam_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }

  }

  onclickCancle(){
    this._router.navigate(['menu/exam_home']);
  }
}
