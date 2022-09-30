import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import {Observable, tap,map } from "rxjs";
import{Response} from "./cart.component.reponse"
import { ShoppingCart } from "./cart.component.shopcartmodel";
import { Product } from "../shared/Product";

@Injectable({
    providedIn:"root"
})
export class CartService{

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
    emptyCart(): void{
      this.shoppingCartArray = [];
    }

    

    //url from inventory team api
    // private baseUrl = "http://localhost:8081/api/products/get/";
    // constructor(private http:HttpClient){}

  // getProdByUpc(upc:string):Observable<Response>{
  //   return this.http.get<Response>(this.baseUrl+upc);
  // }

}