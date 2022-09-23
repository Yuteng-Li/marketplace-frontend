import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //when get product from backend, try to save it as a 
  //array of json object.
  cartItems = [
    {
      "itemId": 1,
      "itemName": "Milk",
      "itemPrice": 2,
      "itemQty": 2
    },
    {
      "itemId": 2,
      "itemName": "Eggs",
      "itemPrice": 3,
      "itemQty": 1
    }
  ]

  diff:number=0;
  //placeholder array
  temp:Array<number>=new Array(this.cartItems.length).fill(0);


  popluateTemp(cartItems:any){
    for (let i=0;i<cartItems.length;i++){
      this.temp[i]=cartItems[i].itemQty;
    }
    return this.temp;
  }

  tempArr = this.popluateTemp(this.cartItems);
  Quantity:number=0;
  numItems = 0;
  cartSubtotal = 0;

  handleChange(index:number){
      this.diff = this.cartItems[index].itemQty-this.temp[index];
      //also handle subtotal
      //rewrite cartsubtotal using itemQty*itemPrice
      //two cases, when increase qty and decrease qty
      //case 1: increase qty
      if(this.cartItems[index].itemQty>this.temp[index]){  
        this.cartSubtotal+=this.cartItems[index].itemPrice;
      }
      else{
        this.cartSubtotal-=this.cartItems[index].itemPrice;
      }
        this.temp[index] = this.cartItems[index].itemQty;
        this.numItems+=this.diff;

  }


  constructor() { 

  }

  ngOnInit() {

    this.cartItems.forEach(item => { 
      this.cartSubtotal += (item.itemPrice * item.itemQty)
  })

  this.cartItems.forEach(item => {
    this.numItems += item.itemQty
  })


}

}
