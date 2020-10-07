import { Component, OnInit,ViewChild } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import {exam_details_class} from "../../classes/exam_details_class";


@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.css']
})
export class ExamHomeComponent implements OnInit {

  exam_tbl_arr:exam_details_class[]=[];
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
    "Exam_name",
    "Batch_name",
    "Date",
    "Marks",
    "Time",
    "View_Question",
    "Batch_Result"
  ];

role:number=0;


  constructor(private _ser:ExamService,private _router:Router) { }

  ngOnInit() {
    //console.log(this.role);
    this.flag=true;


    this._ser.examBybatch().subscribe((data:any)=>{
      console.log(data);
      this.  exam_dataSource.paginator = this.paginator;
      this.  exam_dataSource.sort = this.sort;
      this.exam_tbl_arr=data;
      this.exam_dataSource.data=this.exam_tbl_arr;
      this.exam_dataSource.sort = this.sort;


    });

  }

  view_question_paper(item){
    this._router.navigate(["/menu/view_paper", item.Exam_id]);

  }
  Exam_result(item)
  {
    this._router.navigate(["/menu/batch_result/",item.Exam_id])
  }

  Add_Exams() {
    this._router.navigate(["menu/test_home"]);
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

}
