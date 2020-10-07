import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthgardService {
  email:string="";

    constructor(private _route:Router) { }
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean  {
      this.email=localStorage.getItem('email_id');

      if(this.email!="")
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
