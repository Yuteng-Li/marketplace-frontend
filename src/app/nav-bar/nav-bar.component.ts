import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
=======
import { UserService } from '../user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user!: SocialUser;

<<<<<<< HEAD
  constructor(private authService: SocialAuthService) { }
=======

  constructor(private authService: SocialAuthService, private UserService:UserService, private router: Router) { }
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
<<<<<<< HEAD
    });
=======
      if(this.user != null)
      {
        this.displayByID(this.user.email);
      }
    });

    if(this.user != null)
    {
      this.displayByID(this.user.email);
    }

    console.log(this.user);

>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
  }

  signOut(): void {
    this.authService.signOut();
<<<<<<< HEAD
  }
=======
    localStorage.removeItem('APP_TOKEN');
    this.router.navigate(['/home-page'])
  }
  displayByID(Email:string){
    this.UserService.getUsersByEmail(Email).subscribe(user => {
      this.user.id = user.user_id;
    console.log(this.user.id)},
      (error) => {
      {
        this.UserService.createUsersByEmail(this.user.email, this.user.firstName, this.user.lastName, "confiential",  "510-101-1010")
        .subscribe(user => this.user.id = user.user_id)
      }
    })
}
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
}
