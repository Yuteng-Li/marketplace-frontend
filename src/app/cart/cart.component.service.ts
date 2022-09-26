import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import {Observable, tap,map } from "rxjs";
import{Response} from "./cart.component.reponse"
import { ShoppingCart } from "./cart.component.shopcartmodel";
import { Product } from "./cart.component.model";

@Injectable({
    providedIn:"root"
})
export class CartService{

    shoppingCartArray:ShoppingCart[]=[];
    cartItem!:ShoppingCart;
    addToCart(product:Product){
      //figure out how to double click on add to cart;
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

    

    //url from inventory team api
    // private baseUrl = "http://localhost:8081/api/products/get/";
    // constructor(private http:HttpClient){}

  // getProdByUpc(upc:string):Observable<Response>{
  //   return this.http.get<Response>(this.baseUrl+upc);
  // }

}