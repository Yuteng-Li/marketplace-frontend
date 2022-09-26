import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

    user!: SocialUser;

    constructor(private authService: SocialAuthService) { }
  
    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(user);
      });
    }
  
    signOut(): void {
      this.authService.signOut();
    }
  
  listOfCards = [
    {
      "creditCardID": 1,
      "userID": 1,
      "bankName": "Bobby Joe",
      "cardholderName": "Wellsfargo",
      "cardType": "Visa",
      "cardNumber": "4443123467891234",
      "securityNumber": "808",
      "expiration": "2022-09-20"
  },
  {
      "creditCardID": 2,
      "userID": 3,
      "bankName": "Nancy Johnson",
      "cardholderName": "Bank of America",
      "cardType": "Amex",
      "cardNumber": "3734567891011121",
      "securityNumber": "6290",
      "expiration": "2024-01-25"
  },
  {
      "creditCardID": 3,
      "userID": 2,
      "bankName": "Andrew Williams",
      "cardholderName": "Chase",
      "cardType": "MasterCard",
      "cardNumber": "4264483469273672",
      "securityNumber": "700",
      "expiration": "2026-09-29"
  },
  {
      "creditCardID": 4,
      "userID": 5,
      "bankName": "George Lee",
      "cardholderName": "Chase",
      "cardType": "Visa",
      "cardNumber": "4231902528753161",
      "securityNumber": "232",
      "expiration": "2025-03-15"
  },
  {
      "creditCardID": 5,
      "userID": 4,
      "bankName": "Jenny Jones",
      "cardholderName": "Wellsfargo",
      "cardType": "Amex",
      "cardNumber": "3484127952481970",
      "securityNumber": "1101",
      "expiration": "2028-06-16"
  },
  {
      "creditCardID": 6,
      "userID": 3,
      "bankName": "Nancy Johnson",
      "cardholderName": "CitiBank",
      "cardType": "Discovery",
      "cardNumber": "6091862988814035",
      "securityNumber": "444",
      "expiration": "2027-07-11"
  },
  {
      "creditCardID": 7,
      "userID": 1,
      "bankName": "Bobby Joe",
      "cardholderName": "Wellsfargo",
      "cardType": "MasterCard",
      "cardNumber": "4100360765536477",
      "securityNumber": "121",
      "expiration": "2024-08-07"
  }
  ]

}
