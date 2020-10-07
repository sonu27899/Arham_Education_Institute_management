import { Component, OnInit,ViewChild} from '@angular/core';
import { FacultyService } from '../../services/faculty.service';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import {faculty_class} from "../../classes/faculty_class";


@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.css']
})
export class FacultyHomeComponent implements OnInit {
  faculty_tbl_arr: faculty_class[] = [];
  faculty_delarr: faculty_class[] = [];
  j: number;
  flag:boolean;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
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
    "Action1",
    "Name",
    "Mobile_no",
    "Email_id",
    "Date_of_birth",
    "Salary",
    "Qualification",
    "Action"
  ];

  Faculty_type:number;
  constructor(private _ser:FacultyService,private _router:Router) { }

  ngOnInit() {

    this.flag=true;


    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);
    }

    this._ser.getAllFaculty().subscribe((data:any)=>{
      console.log(data);
      this.faculty_dataSource.paginator = this.paginator;
      this.faculty_dataSource.sort = this.sort;
      this.faculty_tbl_arr=data;
      this.faculty_dataSource.data=this.faculty_tbl_arr;
      this.faculty_dataSource.sort = this.sort;


    });

  }

  Salary(){
    this._router.navigate(["menu/salary_faculty"]);
  }

  Add_employee() {
    this._router.navigate(["menu/add_faculty"]);
  }

  onFaculty_Delete(arr)
  {
    console.log(arr.Faculty_id);
    this._ser.deleteFaculty(arr.Faculty_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.ngOnInit();
      }
    );
  }

  onCheakboxchacked(item:faculty_class) {
    if (this.faculty_delarr.find(x => x == item)) {
      this.faculty_delarr.splice(this.faculty_delarr.indexOf(item), 1);
    } else {
      this.faculty_delarr.push(item);
    }
    console.log(this.faculty_delarr);
  }


  Selected_delete() {
    this._ser.deleteAll(this.faculty_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.faculty_delarr.length; this.i++) {
        if (this.faculty_tbl_arr.find(x => x == this.faculty_delarr[this.i])) {
          this.faculty_tbl_arr.splice(this.faculty_tbl_arr.indexOf(this.faculty_delarr[this.i]), 1);
        }
      }
      this.faculty_dataSource.data = this.faculty_tbl_arr;
    });
  }


  onFaculty_Update(item){
    this._router.navigate(["/menu/update_faculty", item.Faculty_id]);
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
