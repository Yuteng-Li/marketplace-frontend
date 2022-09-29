import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  localUser =  localStorage.getItem('user');
  user!: SocialUser;

  constructor(private readonly authService: SocialAuthService) { }

  ngOnInit() {

    if(this.localUser!=null)
    {
      this.user= JSON.parse(this.localUser);
    }

  }


}
