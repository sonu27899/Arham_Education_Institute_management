import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { LoginService } from '../services/login.service';
import { student_class } from '../classes/student_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  Status:number;
  Fees:number;
  Joining_date:Date;
  student_id:number;
  gender:boolean;


  constructor(private stu_ser:StudentService,private log_ser:LoginService,private _router:Router) { }

  ngOnInit(): void {

    this.Email_id=localStorage.getItem("email_id");
    this.student_id=Number(localStorage.getItem("student_id"));
    this.log_ser.getstudentById(this.Email_id).subscribe(
      (data:any[])=>
      {
		  console.log(data[0]);
        this.Name=data[0].Name+" "+data[0].Middle_name+" "+data[0].Last_name;
        this.Batch_no=data[0].Batch_name;
        this.Phone_no=data[0].Phone_no;
        this.Parent_name=data[0].Parent_name;
        this.Parent_mobile_no=data[0].Parent_mobile_no;
        this.Address=data[0].Address;
        this.Date_of_birth=data[0].Date_of_birth;
        this.Fees=data[0].Fees;
        this.Joining_date=data[0].Joining_date;
        this.gender=data[0].gender;
      }
    );

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
    this._router.navigate(['menu/']);
  }

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Phone_no.toString.length>=10) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }
  onclickUpdate()
  {
    this.stu_ser.updateStudent(new student_class(this.student_id,null,this.Name,this.Batch_no,this.gender,this.Email_id,this.Phone_no,this.Last_name,this.Middle_name,this.Parent_name,this.Parent_mobile_no,this.Address,this.Date_of_birth,null,this.Fees,this.Joining_date)).subscribe(
      (data:any)=>
      {
        console.log(data);
        alert("Profile Updated");
        this._router.navigate(['menu/']);
      }
    )
  }

}
