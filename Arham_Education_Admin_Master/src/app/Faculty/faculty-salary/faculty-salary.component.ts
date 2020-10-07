import { Component, OnInit,ViewChild} from '@angular/core';
import { FacultyService } from '../../services/faculty.service';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import {faculty_class} from "../../classes/faculty_class";

import { salary_class } from 'src/app/classes/salary_class';
import { FeesService } from 'src/app/services/fees.service';

@Component({
  selector: 'app-faculty-salary',
  templateUrl: './faculty-salary.component.html',
  styleUrls: ['./faculty-salary.component.css']
})
export class FacultySalaryComponent implements OnInit {
  faculty_tbl_arr: faculty_class[] = [];
  faculty_delarr: faculty_class[] = [];

  date1:Date=new Date(Date.now());

getmonth:number=this.date1.getMonth()+1;
month:any;
num3:number=this.date1.getDate();
salary_date:Date;
  j: number;
  flag:boolean;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  tmp_date:Date;
  flagsalary:boolean[]=[];
  faculty_selection = new SelectionModel(true, []);

  faculty_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  expandedElement;
  arr:number[]=[];
  displayedColumns: string[] = [
    "Name",
    "Mobile_no",
    "Email_id",
    "Salary",
    "Action"
  ];
  Faculty_type:number;

  constructor(private _ser:FacultyService,private _router:Router,private fees_ser:FeesService) { }

  ngOnInit() {

    this.flag=true;

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);
    }



    this._ser.getAllFaculty().subscribe((data:faculty_class[])=>{
      console.log(data);
      this.faculty_tbl_arr=data;
      this.faculty_dataSource.data=this.faculty_tbl_arr;
      this.faculty_dataSource.sort = this.sort;
      this.faculty_dataSource.paginator = this.paginator;
      this.faculty_dataSource.sort = this.sort;

      for(this.i=0;this.i<data.length;this.i++)
      {
//        console.log("hello");
        this._ser.getfacultySalaryLastDate(data[this.i].Faculty_id).subscribe((data:any)=>{
          console.log(data);

          if(data.length==0)
          {
              this.flagsalary.push(false);
          }
          else
          {
            console.log(data[0].Date);
            this.tmp_date=data[0].Date;
            this.salary_date=new Date(this.tmp_date);
            this.month=this.salary_date.getMonth()+1;



            if(this.month==this.getmonth)
            {
              this.flagsalary.push(true);
            }
            else
            {
              this.flagsalary.push(false);
            }

          }

        })

      }

      console.log(this.flagsalary);

    });
  }



  checkIfFinnished(k){
    console.log(k);
  }

  checkIfBeforeDate(k){
    return this.flagsalary[k];
  }

  pay_salary(arr){

    this.fees_ser.addsalary(new salary_class(arr.Faculty_id,arr.Salary)).subscribe((data:any)=>{
      console.log(data);
      this._router.navigate(['menu/faculty_home']);
    })

  }

  onclickCancle(){
    this._router.navigate(['menu/faculty_home']);
  }
  applyFilter(filterValue: string) {
    this.faculty_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.faculty_dataSource.filteredData.length==0)
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
