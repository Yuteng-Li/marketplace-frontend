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
      "itemPrice": 4.19,
      "itemQty": 1
    },
    {
      "itemId": 2,
      "itemName": "Eggs",
      "itemPrice": 3.19,
      "itemQty": 2
    }
  ]

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
