import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import { CreditCard } from "../credit-card/credit-card.component.credit-card-model";
import {Observable, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class PaymentService{

    //url from inventory team api
    private cardUrl = "http://localhost:8080/api/creditCard";
    constructor(private http:HttpClient){}

    // getAllCards():Observable<CreditCard[]>{
    //     return this.http.get<CreditCard[]>(this.cardUrl + "/getCards").pipe(
    //         tap(data=>JSON.stringify(data))
    //     );
    // }
    // deleteCard(id:number):void{
    //     // return this.http.delete<CreditCard>(this.cardUrl+"/deleteCard/"+id);
    // }
    /*POST method to create and add a new card to server*/ 
    addCard(card:CreditCard):Observable<CreditCard>{
        return this.http.post<CreditCard>(this.cardUrl+"/createCard", card);
    }

}