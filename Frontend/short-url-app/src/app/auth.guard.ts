import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate():  boolean  {
    const token = localStorage.getItem('token');
    console.log(token)
    if(token != null)
    {
      return true;
    }
    this.router.navigate(['login']);
    return false;
    
  }
  
}
