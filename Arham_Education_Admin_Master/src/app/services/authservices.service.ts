import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
email:string="";
role:number;
  constructor(private _route:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean  {
    this.email=localStorage.getItem('email_id');
    this.role=parseInt(localStorage.getItem('faculty_type'));
    console.log(this.role);
    if(this.role!=0)
    {
      console.log('yes');
      console.log(this.email);
      return true;

    }
    else
    {
        alert('Login is required');
      this._route.navigate([''])
    }

  }
}
