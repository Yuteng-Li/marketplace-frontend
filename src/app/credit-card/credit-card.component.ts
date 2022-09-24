import { Component, OnInit } from '@angular/core';
import { CreditCard } from './credit-card.component.credit-card-model';
import { CreditCardService } from './credit-card.component.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  constructor(
    private creditCardService:CreditCardService
  ){}
  
  credits!:CreditCard[];

  ngOnInit(): void {
    this.creditCardService.getAllCards().subscribe(data => {
        this.credits = data.filter(object=>{
          //pass in current usedID from user class into the number 3 below
          object['cardNumber'] = "****"+object['cardNumber'].slice(12);
          return object['userID'] == 1;
        })
    });
  }

  removeCard(index:number):void{
    //this.creditCardService.deleteCard(index);
  }
  
  // listOfCards = [
  //   {
  //       "creditCardID": 1,
  //       "userID": 1,
  //       "cardholderName": "Bobby Joe",
  //       "bankName": "Capital One",
  //       "cardType": "Visa",
  //       "cardNumber": "4443123467891234",
  //       "securityNumber": "808",
  //       "expirationYear": "2022",
  //       "expirationMonth": "09"
  //   },
  //   {
  //       "creditCardID": 2,
  //       "userID": 3,
  //       "cardholderName": "Nancy Johnson",
  //       "bankName": "Bank of America",
  //       "cardType": "Amex",
  //       "cardNumber": "3734567891011121",
  //       "securityNumber": "6290",
  //       "expirationYear": "2024",
  //       "expirationMonth": "01"
  //   },
  //   {
  //       "creditCardID": 3,
  //       "userID": 2,
  //       "cardholderName": "Andrew Williams",
  //       "bankName": "HSBC",
  //       "cardType": "MasterCard",
  //       "cardNumber": "4264483469273672",
  //       "securityNumber": "700",
  //       "expirationYear": "2026",
  //       "expirationMonth": "09"
  //   },
  //   {
  //       "creditCardID": 4,
  //       "userID": 5,
  //       "cardholderName": "George Lee",
  //       "bankName": "Chase",
  //       "cardType": "Visa",
  //       "cardNumber": "4231902528753161",
  //       "securityNumber": "232",
  //       "expirationYear": "2025",
  //       "expirationMonth": "11"
  //   },
  //   {
  //       "creditCardID": 5,
  //       "userID": 4,
  //       "cardholderName": "Jenny Jones",
  //       "bankName": "Wells Fargo",
  //       "cardType": "Amex",
  //       "cardNumber": "3484127952481970",
  //       "securityNumber": "1101",
  //       "expirationYear": "2028",
  //       "expirationMonth": "10"
  //   },
  //   {
  //       "creditCardID": 6,
  //       "userID": 3,
  //       "cardholderName": "Nancy Johnson",
  //       "bankName": "Discover",
  //       "cardType": "Discover",
  //       "cardNumber": "6091862988814035",
  //       "securityNumber": "444",
  //       "expirationYear": "2027",
  //       "expirationMonth": "07"
  //   },
  //   {
  //       "creditCardID": 7,
  //       "userID": 1,
  //       "cardholderName": "Bobby Joe",
  //       "bankName": "Citi",
  //       "cardType": "MasterCard",
  //       "cardNumber": "4100360765536477",
  //       "securityNumber": "121",
  //       "expirationYear": "2023",
  //       "expirationMonth": "02"
  //   }
  // ]
}

