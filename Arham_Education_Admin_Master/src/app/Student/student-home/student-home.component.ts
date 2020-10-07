import { Component, OnInit,ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import {student_class} from "../../classes/student_class";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  Student_tbl_arr: student_class[] = [];
  Student_delarr: student_class[] = [];
  j: number;
  flag:boolean;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  Student_selection = new SelectionModel(true, []);

  Student_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  expandedElement;
  arr:number[]=[];
  displayedColumns: string[] = [
    "Action1",
    "Name",
    "Email_id",
    "Batch_name",
    "Phone_no",
    "Date_of_birth",
    "Fees",
    "Joining_date",
    "Status",
    "Action"
  ];
  Faculty_type:number;
role:number=0;
  constructor(private _ser:StudentService,private _router:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
   }

  ngOnInit() {
    console.log(this.role);
    this.flag=true;

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);


    }



    this._ser.getAllStudent().subscribe((data:any)=>{
      console.log(data);
      this.  Student_dataSource.paginator = this.paginator;
      this.  Student_dataSource.sort = this.sort;
      this.Student_tbl_arr=data;
      this.Student_dataSource.data=this.Student_tbl_arr;
      this.Student_dataSource.sort = this.sort;


    });

  }

  Add_Student() {
    this._router.navigate(["menu/add_student"]);
  }

  onStudent_Delete(arr)
  {
    console.log(arr.Student_id);
    this._ser.deleteStudent(arr.Student_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.ngOnInit();
      }
    );
  }

  onCheakboxchacked(item:student_class) {
    if (this.Student_delarr.find(x => x == item)) {
      this.Student_delarr.splice(this.Student_delarr.indexOf(item), 1);
    } else {
      this.Student_delarr.push(item);
    }
    console.log(this.Student_delarr);
  }


  Selected_delete() {
    this._ser.deleteAll(this.Student_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.Student_delarr.length; this.i++) {
        if (this.Student_tbl_arr.find(x => x == this.Student_delarr[this.i])) {
          this.Student_tbl_arr.splice(this.Student_tbl_arr.indexOf(this.Student_delarr[this.i]), 1);
        }
      }
      this.Student_dataSource.data = this.Student_tbl_arr;
    });
  }


  onStudent_Update(item){
    this._router.navigate(["/menu/update_student", item.Student_id]);
  }

  applyFilter(filterValue: string) {
    this.Student_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Student_dataSource.filteredData.length==0)
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

