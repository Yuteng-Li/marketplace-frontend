import { Injectable } from "@angular/core";
import{ HttpClient} from '@angular/common/http'
import { CreditCard } from "../shared/CreditCard";
import {Observable, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class CreditCardService{

    //Credit card API url
    private cardUrl = "http://localhost:8080/api/creditCard";
    constructor(private http:HttpClient){}

    /*GET method to return all cards in database.*/ 
    getAllCards():Observable<CreditCard[]>{
        return this.http.get<CreditCard[]>(this.cardUrl + "/getCards").pipe(
            tap(data=>JSON.stringify(data))
        );
    }

    /*GET method to return one credit card by ID*/
    getCC(id: number) : Observable<any>{ 
        return this.http.get<any>(`${this.cardUrl}/getCard/${id}`); 
    }

    /*DELETE method delete card by creditCardID*/ 
    deleteCard(creditCardID:Number):Observable<unknown>{
        return this.http.delete<CreditCard>(this.cardUrl+"/deleteCard/"+creditCardID);
    }



}