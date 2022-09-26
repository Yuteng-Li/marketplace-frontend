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
  hasCards:boolean = false;

  ngOnInit(): void {
    /*GET cards service call*/
    this.creditCardService.getAllCards().subscribe(data => {
        this.credits = data.filter(object=>{
          //pass in current usedID from user class into the number 3 below
          object['last_four_card_number'] = "****"+object['last_four_card_number'];
          return object['user_id'] == 3;
        })
    });

  }
/*DELETE card service call*/
  removeCard(creditCardID:number):void{
    this.creditCardService.deleteCard(creditCardID).subscribe();
    window.location.reload();

  }

}

