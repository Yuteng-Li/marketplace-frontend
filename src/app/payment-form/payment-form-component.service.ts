import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import { CreditCard } from "../shared/CreditCard";
import {Observable, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class PaymentService{

    //Credit card API url
    private cardUrl = "http://localhost:8080/api/creditCard";
    constructor(private http:HttpClient){}

    /*POST method to create and add a new card to server*/ 
    addCard(card:CreditCard):Observable<CreditCard>{
        return this.http.post<CreditCard>(this.cardUrl+"/createCard", card);
    }

}