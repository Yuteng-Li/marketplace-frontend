import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from './payment-form-component.service';
import { CreditCard } from '../shared/CreditCard';
import { CreditCardService } from '../credit-card/credit-card.component.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
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

      this.backToCreditCards();
  }

  /*redirect back to credit card page*/
  backToCreditCards(){
    this.router.navigate(['/credit-card']);
  }

}
