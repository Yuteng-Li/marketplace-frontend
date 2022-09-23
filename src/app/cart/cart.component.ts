import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { Product } from './cart.component.model';
import { CartService } from './cart.component.service';
import { ShoppingCart } from './cart.component.shopcartmodel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartservice:CartService) {}
  cartItems = this.cartservice.getCart();

  testing!:Product; 

  //figure out how to use getter to create shopping cart
  shoppingCartArray!:ShoppingCart[];
  

  /*diff(difference) is used when determining if we increase qty 
  or decrease qty */
  diff:number=0;
  //placeholder array
  temp:Array<number>=new Array(this.cartItems.length).fill(0);
  tempArr = this.popluateTemp(this.cartItems);
  Quantity:number=0;
  numItems = 0;
  cartSubtotal = 0;


  //this was used to keep track of the itemQty in the begining
  //Was used to compared with updated itemQty after ngModel
  //to determine if we increase or decrease the item
  popluateTemp(cartItems:any){
    for (let i=0;i<cartItems.length;i++){
      this.temp[i]=cartItems[i].itemQty;
    }
    return this.temp;
  }
  handleChange(index:number){
      this.diff = this.cartItems[index].itemQty-this.temp[index];
      //also handle subtotal
      //rewrite cartsubtotal using itemQty*itemPrice
      //two cases, when increase qty and decrease qty
      //case 1: increase qty
      if(this.cartItems[index].itemQty>this.temp[index]){  
        //then we add the itemprice into the subtotal
        //this is fine
        this.cartSubtotal+=(this.diff*this.cartItems[index].itemPrice);
      }
      //case 2:decrease qty
      else{
        //then we subtract itemprice from subtotal
        //i use += because the diff is negative when dec qty
        //  - - = +
        this.cartSubtotal+=(this.diff*this.cartItems[index].itemPrice);
      }
        this.temp[index] = this.cartItems[index].itemQty;
        this.numItems+=this.diff;

  }
  
  ngOnInit() {
    // initaize the stuff from backend here.
    this.cartservice.testhttp().subscribe({
      next: testing => this.testing = testing
    });

    //try useing getter to populate shopping cart array.
    
    this.cartItems.forEach(item => { 
      this.cartSubtotal += (item.itemPrice * item.itemQty)
    })
    this.cartItems.forEach(item => {
      this.numItems += item.itemQty
    })
}

}
