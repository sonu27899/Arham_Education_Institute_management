import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../Services/faculty.service';
import { faculty_class } from '../../classes/faculty_class';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css']
})
export class FacultyProfileComponent implements OnInit {
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

  typeName:string;

Qualification:string;
  qualifications:string[]=[
    "MA","BA","MSC","BSC","MCA","BCA"
  ];
  i: number;

  constructor(private _router: Router, private _emp:FacultyService,private act_router:ActivatedRoute) {
    this.Faculty_id=parseInt(localStorage.getItem('faculty_id'));
   }



  ngOnInit() {

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
        this.Qualification=data[0].Qualification;

        if(this.Role==1)
        {
          this.typeName="Admin";
        }
        else if(this.Role==2)
        {
          this.typeName="Faculty"
        }

        else
        {
          this.typeName="TA";
        }
      }
    );



  }

  onFaculty_Update(){
    this._router.navigate(["/menu/profile_update", this.Faculty_id]);
  }

  onclickCancle()
  {
    this._router.navigate(['menu/']);
  }


}
