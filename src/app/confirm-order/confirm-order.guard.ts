import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderGuard implements CanActivate {
  
  constructor(private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.router.getCurrentNavigation()?.initialUrl.toString() != "/checkout"){
        this.router.navigate(['/home-page'])
        return false;
      }
      return true;
  }
  
}
