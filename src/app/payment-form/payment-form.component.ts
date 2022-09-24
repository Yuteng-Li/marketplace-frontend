import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment-form-component.service';
import { CreditCard } from '../credit-card/credit-card.component.credit-card-model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  newCard: CreditCard = new CreditCard;
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }
  createCard(payment: { bank: String; cardNum: String; sCode: String; name: String; exp: String; }) {

    //creditcard id should auto increment so no need to pass in?
    this.newCard.userID = 1;//insert current user id here
    this.newCard.cardholderName = payment.name;
    this.newCard.bankName = payment.bank;
    this.newCard.cardNumber = payment.cardNum;
    this.newCard.securityNumber = payment.sCode;

    //have to split exp string into month and year
    this.newCard.expirationMonth = payment.exp;
    this.newCard.expirationYear = payment.exp;
    console.log(payment);
  }
  postCard() {//this is the add request
    this.paymentService.addCard(this.newCard);
  }

}
