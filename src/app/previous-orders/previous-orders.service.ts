

import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'
import { Orders } from "./previous-orders.component.model";

import { Observable, of, tap } from 'rxjs';
import { PREVIOUSORDERS } from "./mock-previous-orders";

@Injectable({
  providedIn: 'root'
})
export class PreviousOrdersService {

  //url from inventory team api
  private productUrl = "http://localhost:8082/api/order"; // OMS backend
  constructor(private http:HttpClient){}

  /**
   * Gets prevOrders from backend
   * -REFACTOR WITH HTTP GET WITH PROVIDED ENDPOINT-
   * @returns Observable with list of previous-orders from api
   */
  getPreviousOrders(): Observable<any[]>{
    const prevOrders = of(PREVIOUSORDERS);
    return prevOrders;
  }  

  getPrevOrders(id:string): Observable<any>{ //userID:number){
    return this.http.get<any>(`${this.productUrl}/getOrders/user/${id}`); /*/user/${userID}`); */
  }

  cancelOrder(orderID:number): Observable<any>{
    console.log("called func", orderID)
    return this.http.put(`${this.productUrl}/updateOrder/cancelled/${orderID}`, {observe: 'response',reportProgress: true,responseType: 'text'});
  }
}
