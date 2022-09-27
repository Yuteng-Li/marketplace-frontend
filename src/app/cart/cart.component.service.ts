import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
<<<<<<< HEAD
import { ShopppingCart } from "./cart.component.model";
import {Observable, tap } from "rxjs";
=======
import {Observable, tap,map } from "rxjs";
import{Response} from "./cart.component.reponse"
import { ShoppingCart } from "./cart.component.shopcartmodel";
import { Product } from "./cart.component.model";
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217

@Injectable({
    providedIn:"root"
})
export class CartService{

<<<<<<< HEAD
    //url from inventory team api
    private productUrl = "http://localhost:8081/api/products/get/100000000001";
    constructor(private http:HttpClient){}

    //need to do exception handling
   testhttp():Observable<ShopppingCart>{
        return this.http.get<ShopppingCart>(this.productUrl).pipe(
            tap(data=>console.log('All: ',JSON.stringify(data)))
        );
   }


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
=======
    shoppingCartArray:ShoppingCart[]=[];
    cartItem!:ShoppingCart;
    existInCart:boolean=false;
    tempIndex:number=0;
    addToCart(product:Product){
      //check if prodcut already in cart
      for (let i = 0;i<this.shoppingCartArray.length;++i){
        if (this.shoppingCartArray[i].itemName===product.prod_name){
          this.tempIndex=i;
          this.existInCart=true;
          this.shoppingCartArray[i].itemQty+=1;
        }
        else{
          this.existInCart=false;
        }
      }

      //if the product do not exist, add this into cart
      if(! this.existInCart){
        this.cartItem =<ShoppingCart>{
          itemName:product.prod_name,
          itemPrice:product.price_per_unit,
          itemUpc:product.upc,
          itemImgUrl:product.image_url,
          itemDesc:product.prod_description,
          itemQty:1
        };
        this.shoppingCartArray.push(this.cartItem);
      }      
    }

    

    //url from inventory team api
    // private baseUrl = "http://localhost:8081/api/products/get/";
    // constructor(private http:HttpClient){}

  // getProdByUpc(upc:string):Observable<Response>{
  //   return this.http.get<Response>(this.baseUrl+upc);
  // }

>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
}