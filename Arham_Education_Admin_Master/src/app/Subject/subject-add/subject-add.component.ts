import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SubjectService } from '../../services/subject.service';
import {subject_class} from '../../classes/subject_class';
import { Router, ActivatedRoute } from '@angular/router';
import {SubjectHomeComponent } from '../subject-home/subject-home.component';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit {
 Subject_arr:subject_class[];
  Name:string="";
  flag:boolean=false;
  i:number;
  Faculty_type:number;
  constructor(private _ser:SubjectService,private _router:Router,private matDialog:MatDialogRef<SubjectHomeComponent>,private _act:ActivatedRoute) { }

  ngOnInit() {
    this.flag=true;

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);


    }


    this._ser.getAllSubject().subscribe(
      (data:subject_class[])=>
      {
        this.Subject_arr=data;
      }
    );

  }

  keyPressText(event: any)
  {
  const pattern = /[A-Z\a-z\&\-\@\+\-\^ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }

  onclickAdd()
  {
    if(this.flag==true)
    {

   this._ser.addSubject(new subject_class(this.Name.toUpperCase())).subscribe(
     (data:any)=>
     {
       if(data.errno==1062)
       {
        alert('Subject already exits');

       }
       else
       {
        console.log(data);
       }

       this._router.navigate(['menu/subject_home']);
       //this.currentdialog.close();
       this.matDialog.close();
     }
   );
  }
  }
 onclickCancle()
 {
  this.flag=false;
  if(this.flag==false)
  {
    console.log(this.flag);
    this.matDialog.close();
    this._router.navigate(['menu/subject_home']);
   //this._router.navigate(['menu/color_home']);

 }

 }


}
