import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import {Observable, tap,map } from "rxjs";
import{Response} from "./cart.component.reponse"

@Injectable({
    providedIn:"root"
})
export class CartService{

    //url from inventory team api
    private baseUrl = "http://localhost:8081/api/products/get/";
    constructor(private http:HttpClient){}

  getProdByUpc(upc:string):Observable<Response>{
    return this.http.get<Response>(this.baseUrl+upc);
  }

}