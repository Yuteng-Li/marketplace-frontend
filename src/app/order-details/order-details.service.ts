import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  //url from inventory team api
  private productUrl = "http://localhost:8082/api/order/items"; // OMS backend
  constructor(private http:HttpClient){}

  getOrderDetails(id: number) : Observable<any>{ 
    return this.http.get<any>(`${this.productUrl}/getOrderInfo/${id}`); 
  }
}
