import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { changepassclass } from '../classes/changepassword_class';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  email_id:string;
  check_code:number;
  code:number;
  new_password:string;
  repeat_password:string;

  constructor(private _ser:LoginService,private _router:Router) { }

  ngOnInit() {
    this.check_code=parseInt(localStorage.getItem('code'));
    this.email_id=localStorage.getItem('Email_id');
    console.log(this.check_code);
  }

  onclickchangepassword()
  {
    if(this.check_code==this.code)
    {
      if(this.new_password==this.repeat_password)
      {
        this._ser.changePassword(new changepassclass(this.email_id,this.new_password)).subscribe(
          (data:any)=>
          {
            console.log(data);
            alert("Password Changes");
            this._router.navigate(['']);
          }
        );
      }
      else
      {
        alert("Password & Confirm Password Must be Same");
      }
    }
    else
    {
      alert("Invalid Code");
    }
  }

}
