import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../Services/faculty.service';
import { faculty_class } from '../../classes/faculty_class';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-faculty-update',
  templateUrl: './faculty-update.component.html',
  styleUrls: ['./faculty-update.component.css']
})
export class FacultyUpdateComponent implements OnInit {
  Faculty_id:number;
  Email_id: string;
  Password: string;
  Name: string;
  Mobile_no: string;
  Date_of_birth: Date;
  Salary: number;
  Role: number;
  arr_faculty: faculty_class[];
  arr: faculty_class[];
  type: number[] = [
    1, 2, 3
  ];

Qualification:string;
  qualifications:string[]=[
    "MA","BA","MSC","BSC","MCA","BCA"
  ];
  i: number;
  Salary1:number;
role:number=0;
  constructor(private _router: Router, private _emp:FacultyService,private act_router:ActivatedRoute) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
   }

  ngOnInit() {

    this._emp.getAllFaculty().subscribe(
      (data:any)=>{
       // console.log(data);
        this.arr_faculty=data;
      }
    );

    this.Faculty_id = this.act_router.snapshot.params["Faculty_id"];
    console.log(this.Faculty_id);
    this._emp.getFacultyById(this.Faculty_id).subscribe(
      (data:faculty_class[])=>{
        console.log(data);
        this.Email_id=data[0].Email_id;
        this.Password=data[0].Password;
        this.Name=data[0].Name;
        this.Mobile_no=data[0].Mobile_no;
        this.Role=data[0].Role;
        this.Date_of_birth=data[0].Date_of_birth;
        this.Salary=data[0].Salary;
        this.Salary1=data[0].Salary;
        this.Qualification=data[0].Qualification;
      }
    );
  }

  onClickChange()
  {
    if (this.Salary< 0 || this.Salary <6000) {
      alert("Salary can not less than 6k");
      this.Salary =this.Salary1;
    }
    if(this.Salary>30000)
    {
      alert("Salary can not more than 30k");
      this.Salary=this.Salary1;
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

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Mobile_no.length>=10) {
       // invalid character, prevent input
           event.preventDefault();
      }
 }
  onclickCancle()
  {
    this._router.navigate(['menu/faculty_home']);
  }
  onclickUpdate()
  {
    this._emp.updateFaculty(new faculty_class(this.Name,this.Mobile_no,this.Email_id,this.Password, this.Date_of_birth, this.Salary, this.Qualification,this.Role),this.Faculty_id).subscribe(
      (data:any)=>{
        console.log(data);
        this._router.navigate(['menu/faculty_home']);
      }
    );
  }
}


