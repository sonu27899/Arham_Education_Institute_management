import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { Router } from "@angular/router";
import { batch_class } from "../../classes/batch_class";
import { StudentService } from '../../services/student.service';
import {student_class} from "../../classes/student_class";



@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  Batch_id:number;
  Batch_list:batch_class[]=[];
  Password:string="";
  Name:string="";
  Batch_no:number;
  Email_id:string="";
  Phone_no:string="";
  Last_name:string="";
  Middle_name:string="";
  minDate = new Date(1990, 0, 1);
  maxDate = new Date(2000, 11, 31);
  Parent_name:string="";
  Parent_mobile_no:string="";
  Address:string="";
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
  constructor(private _ser:AnnouncementService,private _router:Router,private stu_ser:StudentService) { }

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

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) ||  this.Phone_no.length>=10) {

        event.preventDefault();


       // invalid character, prevent input

      }
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


 keyPressNumber1(event: any) {
  const pattern = /[0-9]/;
  let inputChar = String.fromCharCode(event.charCode);
  // console.log(inputChar, e.charCode);
     if (!pattern.test(inputChar) || this.Parent_mobile_no.length>=10) {

      event.preventDefault();
    }
}

  onclickAdd() {
    console.log(this.Email_id);
    console.log(this.arr_Student);

    this.stu_ser.addStudent(new student_class(this.Password,this.Name,this.Batch_no,this.Email_id,this.Phone_no,this.Last_name,this.Middle_name,this.Parent_name,this.Parent_mobile_no,this.Address,this.Date_of_birth,this.Status,this.Fees,this.Joining_date,this.Gender)).subscribe(
      (data: any) => {
        if (data.errno == 1062) {
          alert("Email id or Mobile_no is already exist");
          this.Email_id = '';
          this.Phone_no='';
        }
        else {
          if(this.Fees<0)
          {
            alert("Fees is invalid")
            this.Fees=0;
          }
          else
          {
            console.log(data);
            this.arr = data;
           this._router.navigate(['menu/student_home']);
          }

        }
        //console.log(this.arr);
        //
      }
    );
  }

}

