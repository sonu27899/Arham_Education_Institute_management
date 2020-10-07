import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../Services/faculty.service';
import { faculty_class } from '../../classes/faculty_class';
import { Router } from "@angular/router";

@Component({
  selector: 'app-faculty-add',
  templateUrl: './faculty-add.component.html',
  styleUrls: ['./faculty-add.component.css']
})
export class FacultyAddComponent implements OnInit {
  Email_id: string;
  minDate = new Date(1960, 0, 1);
  maxDate = new Date(2000, 11, 31);
  Password: string;
  Name: string="";
  Mobile_no: string="";
  Date_of_birth: Date;
  Salary: number;
  Role1:String="";
  Role:number=1;

  arr_faculty: faculty_class[];
  arr: faculty_class[];
  type:string[] = [
    "Faculty","TA"
  ];

Qualification:string;
  qualifications:string[]=[
    "MA","BA","MSC","BSC","MCA","BCA"
  ];
  i: number;
  Faculty_type:number;

  constructor(private _router: Router, private _emp:FacultyService) { }
  ngOnInit() {

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);
    }


    this._emp.getAllFaculty().subscribe(
      (data: any) => {
        console.log(data);
        this.arr_faculty = data;
      }
    );
  }

  onClickChange()
  {
    if (this.Salary< 0 || this.Salary <6000) {
      alert("Salary can not less than 6k");
      this.Salary =6000;
    }
    if(this.Salary>30000)
    {
      alert("Salary can not more than 30k");
      this.Salary=18000;
    }


  }


  keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20 ) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }
  onclickCancle()
  {
    this._router.navigate(['menu/faculty_home']);
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

  onclickAdd() {
    console.log(this.Email_id);
    console.log(this.arr_faculty);

    if(this.Role1=="Faculty")
    {
        this.Role=2;
    }
    else
    {
      this.Role=3;
    }
    this._emp.addFaculty(new faculty_class(this.Name,this.Mobile_no,this.Email_id,this.Password, this.Date_of_birth, this.Salary, this.Qualification,this.Role)).subscribe(
      (data: any) => {
        if (data.errno == 1062) {
          alert("Email id or Mobile_no is already exist");
          this.Email_id = '';
        }
        else {
          if(this.Salary<0)
          {
            alert("Salary is invalid")
            this.Salary=0;
          }
          else
          {
            console.log(data);
            this.arr = data;
           this._router.navigate(['menu/faculty_home']);
          }

        }
        //console.log(this.arr);
        //
      }
    );
  }

}
