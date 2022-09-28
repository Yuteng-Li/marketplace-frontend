import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: SocialUser;

  constructor(private authService: SocialAuthService, private router:Router) { }


   
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
        localStorage.setItem('APP_TOKEN', JSON.stringify(this.user.authToken));
        this.router.navigate(['/home-page']);
 
    });
  }


  signOut(): void {
    this.authService.signOut();
  }

  returnToHome(){
    this.router.navigate(["./home-page"]);
    console.log("hi");
  }

}