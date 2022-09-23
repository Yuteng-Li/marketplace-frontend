import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import { Product } from "./cart.component.model";
import {Observable, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class CartService{

    //url from inventory team api
    private productUrl = "http://localhost:8081/api/products/get/100000000001";
    constructor(private http:HttpClient){}

    //need to do exception handling
   testhttp():Observable<Product>{
        return this.http.get<Product>(this.productUrl).pipe(
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
}