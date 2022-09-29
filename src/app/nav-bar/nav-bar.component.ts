import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { using } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  usingLocalLog = true;
  user!: SocialUser;
  retrievedUser= localStorage.getItem('user')
  

  constructor(private authService: SocialAuthService, private UserService:UserService, private router: Router) {

  }

  ngOnInit() {

      this.authService.authState.subscribe((user) => {
        this.user = user;
        if(this.user != null)
        {
          this.displayByID(this.user.email);
          localStorage.setItem('APP_TOKEN', JSON.stringify(this.user.authToken));
          localStorage.setItem('user', JSON.stringify(this.user));
          this.retrievedUser = localStorage.getItem('user');

          this.usingLocalLog=false;
        }
        else if(this.retrievedUser!=null)
        {
          this.user =  JSON.parse(this.retrievedUser);
          this.usingLocalLog=true;
        }

      });
  }

  signOut(): void {
    if(!this.usingLocalLog)
    {
      this.authService.signOut();
    }
    this.retrievedUser=null;
    localStorage.clear();
    this.router.navigate(['/home-page'])
  }


  displayByID(Email:string){
     this.UserService.getUsersByEmail(Email).subscribe(
      { next: user => 
        //socialuser has string as id. the user from database has integer as id
       {this.user.id = user.user_id.toString();
        localStorage.setItem('user', JSON.stringify(this.user))
      },
       //phone number is only 10 char long.
       error: e => this.UserService.createUsersByEmail(this.user.email, this.user.firstName, this.user.lastName, "confiential",  "5101011010")
       .subscribe(user => {this.user.id = user.user_id.toString();
        localStorage.setItem('user', JSON.stringify(this.user))})
      })


  }
}
