import { Component, OnInit } from '@angular/core';
import { login_class } from "../classes/login_class";
import { LoginServiceService } from './login-service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  flag:boolean=true;
  email_id1:string;
  password1:string="";
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;



  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();


  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';


  constructor(private fb: FormBuilder,private formBuilder: FormBuilder,private _ser:LoginServiceService,private _router:Router,private matDialog:MatDialog,private _act:ActivatedRoute) { }

  onclickforget()
  {
    //this._router.navigate(['forgetpassword']);


    this._act.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
      }
      this.currentdialog=this.matDialog.open(ForgetpasswordComponent,{
        data: {id : this.email_id1}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');

      })
    });


  }






  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {

        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
   //     await this.authService.login(username, password);
   this._ser.login(new login_class(username,password)).subscribe(
    (data:any[])=>
    {
        console.log(data);
        if(data.length==1)
        {
          //console.log(this.email_id1);
          localStorage.setItem('email_id',username);

          localStorage.setItem('faculty_type',data[0].Role);
          localStorage.setItem('faculty_id',data[0].Faculty_id);
            this._router.navigate(['menu']);
        }
        else
        {
          alert('Email_id or Password Incorrect');
        }

    }
  );

    }
else{
    alert('Please Enter Valid Detalis');
}

  }
  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

}
