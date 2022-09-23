import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class CartService{
    getCart(){
    return[
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
    }
}