import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user!: SocialUser;


  constructor(private authService: SocialAuthService, private UserService:UserService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
      if(this.user != null)
      {
        this.displayByID(this.user.email);
      }
    });

    if(this.user != null)
    {
      this.displayByID(this.user.email);
    }


  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/home-page'])
  }
  displayByID(Email:string){
    this.UserService.getUsersByEmail(Email).subscribe(
     { next: user => 
      this.user.id = user.user_id,
      error: e => this.UserService.createUsersByEmail(this.user.email, this.user.firstName, this.user.lastName, "confiential",  "510-101-1010")
      .subscribe(user => this.user.id = user.user_id),
     })
     }
}
