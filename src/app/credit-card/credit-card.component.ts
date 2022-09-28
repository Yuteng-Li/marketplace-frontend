import { Component, OnInit } from '@angular/core';
import { CreditCard } from '../shared/CreditCard';
import { CreditCardService } from './credit-card.component.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  constructor(
    private creditCardService:CreditCardService,
    private authService: SocialAuthService
  ){}
  
  credits:CreditCard[]=[];
  user:SocialUser = new SocialUser;
  currUserID!:Number;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.currUserID=parseInt(user.id);
    });

    console.log(this.currUserID)
    
    /*GET cards service call*/
      this.creditCardService.getAllCards().subscribe(data => {
        this.credits = data.filter(object=>{
          //pass in current usedID from user class into the number 3 below
          object['last_four_card_number'] = "****"+object['last_four_card_number'];
          return object['user_id'] == this.currUserID;
        })
    });
  }
  
/*DELETE card service call*/
  removeCard(creditCardID:Number):void{
    this.creditCardService.deleteCard(creditCardID).subscribe();
    window.location.reload();
  }
}

