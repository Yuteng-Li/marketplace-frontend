import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form-success-checkout',
  templateUrl: './payment-form-success-checkout.component.html',
  styleUrls: ['./payment-form-success-checkout.component.css']
})
export class PaymentFormSuccessCheckoutComponent implements OnInit {

  user: SocialUser = new SocialUser;
  currUserID!:number;

  constructor(
    private authService: SocialAuthService,
    private router:Router
    ) { }
  localUser =  localStorage.getItem('user');


  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if(user==null && this.localUser !=null)
      {
        this.user = JSON.parse(this.localUser);
      }else
      {
        this.user=user;
      }
      this.currUserID = parseInt(user.id);
    });
    console.log(this.currUserID)
  }
  
  /*redirect back to credit card page*/
  backToCreditCards(){
    this.router.navigate(['/checkout']);
  }
}
