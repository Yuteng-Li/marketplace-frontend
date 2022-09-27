import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: SocialUser;

  constructor(private authService: SocialAuthService, private router: Router) {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  
 
  canActivate(nextRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem("APP_TOKEN") || this.user==null) {
      this.router.navigate(['/login'])  
      return false;
    }
    return true;
  }

}
