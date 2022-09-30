import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: SocialAuthService,
    private router:Router
  ){}
  
  credits:CreditCard[]=[];
  user!:SocialUser;
  localUser =  localStorage.getItem('user');
  currUserID!:Number;

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
        this.user=user;
        this.currUserID=parseInt(user.id);
    });

    if(this.user==null && this.localUser !=null)
      {
        this.user = JSON.parse(this.localUser);
        this.currUserID=parseInt(this.user.id);
        console.log(this.currUserID)
      }
    
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

  removeCard(creditCardID:number,index:number,lastfour:String):void{
    if(confirm("Are you sure you want to delete this card ending in "+ lastfour)){
      this.creditCardService.deleteCard(creditCardID).subscribe();
      this.credits[index] = {
        
        credit_card_id:0,

        user_id: -1,

        cardholder_name: "",

        last_four_card_number: "",

        expiration_year: "",

        expiration_month: ""
      } 
    
    }
  }
}

