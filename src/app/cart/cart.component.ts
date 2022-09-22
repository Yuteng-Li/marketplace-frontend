import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  numItems = 0;
  cartSubtotal = 0;

  cartItems = [
    {
      "itemId": 1,
      "itemName": "Milk",
      "itemPrice": 2.00,
      "itemQty": 1
    },
    {
      "itemId": 2,
      "itemName": "Eggs",
      "itemPrice": 1.20,
      "itemQty": 3
    }
  ]
  
  removeItem(index: number) {
    this.cartItems.splice(index,1)
  }

  constructor() { }

  ngOnInit() {
    this.cartItems.forEach(item => { 
      this.cartSubtotal += (item.itemPrice * item.itemQty)
  })

  this.cartItems.forEach(item => {
    this.numItems += item.itemQty
  })
}

}
