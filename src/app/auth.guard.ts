import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  localUser =  localStorage.getItem('user');
  user!: SocialUser;

  constructor(private authService: SocialAuthService, private router: Router) {
    if(this.localUser!=null)
    {
      this.user= JSON.parse(this.localUser);
    }
  }

  
 
  canActivate(nextRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.localUser =  localStorage.getItem('user');
    if(this.localUser!=null)
    {
      this.user= JSON.parse(this.localUser);
    }
    if (!localStorage.getItem("APP_TOKEN") || this.user==null) {
      this.router.navigate(['/login'])  
      return false;
    }
    return true;
  }

}
