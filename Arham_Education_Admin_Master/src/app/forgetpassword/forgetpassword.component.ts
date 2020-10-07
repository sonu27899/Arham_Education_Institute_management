import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { LoginServiceService } from '../login/login-service.service';
import { email } from '../classes/email_class';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  flag:boolean=true;
  email_id1:string="";
  password:string;
  code:number;

  constructor(private _ser:LoginServiceService,private _router:Router,private _act:ActivatedRoute,public dialogRef: MatDialogRef<LoginComponent>) {

   }
 onclickcancel()
 {
   //this._router.navigate(['']);
   this.dialogRef.close();
 }
 onclicksendpassword()
 {
   console.log(this.email_id1);
  this._ser.getfacultyById(this.email_id1).subscribe(
    (data:any[])=>
    {
      if(data.length==0)
      {
        alert("invalid email_id");
      }
      else
      {
        this.password=data[0].Password;
        this.code=(Math.floor(Math.random()*1000)+9000);
        localStorage.setItem('code',this.code.toString());
        localStorage.setItem('Email_id',this.email_id1);
        this._ser.sentMail(new email(this.email_id1,"Arham Education Forget Password","Your Code for Change Password is : "+this.code)).subscribe(
        (data:any[])=>
        {
          console.log(data);
          console.log(localStorage.getItem('code'));
        }
        );
        console.log(localStorage.getItem('code'));
        this._router.navigate(['changepassword']);
        this.dialogRef.close();

      }
    }
  );
 }


  ngOnInit() {

  }

}

