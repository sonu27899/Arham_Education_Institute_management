import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { Router,ActivatedRoute} from "@angular/router";
import { batch_class } from "../../classes/batch_class";
import { StudentService } from '../../services/student.service';
import {student_class} from "../../classes/student_class";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  Batch_id:number;
  Batch_list:batch_class[]=[];
  Password:string;
  Name:string;
  Batch_no:number;
  Email_id:string;
  Phone_no:string;
  Last_name:string;
  Middle_name:string;
  Parent_name:string;
  Parent_mobile_no:string;
  Address:string;
  Date_of_birth:Date;
  Status:number=1;
  Fees:number;
  Joining_date:Date=new Date("12/12/1998");
  Student_id:number;
  arr_Student: student_class[];
  arr: student_class[];


  type:string[] = [
    "Male","Female"
  ];

  Gender:string;

  Faculty_type:number;
  constructor(private _act:ActivatedRoute,private _ser:AnnouncementService,private _router:Router,private stu_ser:StudentService) { }


  ngOnInit() {

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);
    }


    this._ser.getAllBatch().subscribe((data:batch_class[]) => {
      this.Batch_list = data;
    });

    this.stu_ser.getAllStudent().subscribe(
      (data: any) => {
        console.log(data);
        this.arr_Student = data;
      }
    );

    this.Student_id = this._act.snapshot.params["Student_id"];
    console.log(this.Student_id);
    this.stu_ser.getStudentById(this.Student_id).subscribe(
      (data:student_class[])=>{
        console.log(data);
        this.Email_id=data[0].Email_id;
        this.Password=data[0].Password;
        this.Name=data[0].Name;
        this.Phone_no=data[0].Phone_no;
        this.Parent_mobile_no=data[0].Parent_mobile_no;
        this.Last_name=data[0].Last_name;
        this.Middle_name=data[0].Middle_name;
        this.Parent_name=data[0].Parent_name;
        this.Parent_mobile_no=data[0].Parent_mobile_no;
        this.Fees=data[0].Fees;
        this.Status=data[0].Status;
        this.Date_of_birth=data[0].Date_of_birth;
        this.Joining_date=data[0].Joining_date;
       this.Batch_no=data[0].Batch_no;
       this.Address=data[0].Address;
       this.Gender=data[0].Gender;
      }
    );

  }


  onClickChange()
  {
    if (this.Fees< 0 || this.Fees <10000) {
      alert("Fees can not less than 10k");
      this.Fees = 10000;
    }
    if(this.Fees>30000)
    {
      alert("Item can not more than 30k");
      this.Fees=20000;
    }


  }


  keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }


  onclickCancle()
  {
    this._router.navigate(['menu/student_home']);
  }
  onclickUpdate()
  {
    this.stu_ser.updateStudent(new student_class(this.Password,this.Name,this.Batch_no,this.Email_id,this.Phone_no,this.Last_name,this.Middle_name,this.Parent_name,this.Parent_mobile_no,this.Address,this.Date_of_birth,this.Status,this.Fees,this.Joining_date,this.Gender),this.Student_id).subscribe(
      (data:any)=>{
        console.log(data);
        this._router.navigate(['menu/student_home']);
      }
    );
  }

}
