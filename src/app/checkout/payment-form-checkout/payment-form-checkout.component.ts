import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardService } from 'app/credit-card/credit-card.component.service';
import { PaymentService } from 'app/payment-form/payment-form-component.service';
import { CreditCard } from 'app/shared/CreditCard';
// import { CreditCardService } from 'src/app/credit-card/credit-card.component.service';
// import { PaymentService } from 'src/app/payment-form/payment-form-component.service';
// import { CreditCard } from 'src/app/shared/CreditCard';

@Component({
  selector: 'app-payment-form-checkout',
  templateUrl: './payment-form-checkout.component.html',
  styleUrls: ['./payment-form-checkout.component.css']
})
export class PaymentFormCheckoutComponent implements OnInit {

  newCard: CreditCard = new CreditCard;
  credits:CreditCard[]=[];
  user!: SocialUser;
  currUserID!:number;

  constructor(private paymentService: PaymentService, 
    private creditCardService:CreditCardService,
    private authService: SocialAuthService,
    private router:Router
    ) { }
  localUser =  localStorage.getItem('user');


  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user=user;
      this.currUserID = parseInt(user.id);
    });

    if(this.user==null && this.localUser !=null)
      {
        this.user = JSON.parse(this.localUser);
        this.currUserID=parseInt(this.user.id);
        console.log(this.currUserID)
      }
    console.log(this.currUserID)
    
    this.creditCardService.getAllCards().subscribe(data => {
      this.credits = data.filter(object=>{
        return object;
      })
    });

  }

  /*Creating new card object with information from payment form.*/
  createCard(payment: { cardNum: String;fullName: String; exp: String; }) {

    this.newCard.credit_card_id = 0;

    this.newCard.user_id = this.currUserID;//insert current user id here

    this.newCard.cardholder_name = payment.fullName;
    this.newCard.last_four_card_number = payment.cardNum.slice(-4);
    this.newCard.expiration_month = payment.exp.slice(0,2);
    this.newCard.expiration_year = payment.exp.slice(-2);

    this.postCard(this.newCard);
  }

  /*Calls POST function in PaymentService to post a card.*/
  postCard(createdCard:CreditCard) {//this is the add request
    this.paymentService.addCard(createdCard).subscribe(
      card => this.credits.push(createdCard));
      this.paymentSuccess();
  }

  /*redirect back to credit card checkout page*/
  paymentSuccess(){
    this.router.navigate(['/payment-form-checkout/success']);
  }

}
