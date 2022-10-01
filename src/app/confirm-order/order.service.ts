import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { BackEndCart, Order } from '../shared/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //url from order team api
  private orderUrl = "http://localhost:8082/api/order";

  private marketPlaceCartUrl="http://localhost:8080/api/cartitems"

  constructor(private http:HttpClient){}

  placeOrder(order: Order):Observable<any>{
    return this.http.post(`${this.orderUrl}/createOrder`, order, {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );

  }

  createCartInBackEnd(cart:BackEndCart):Observable<any>{
    return this.http.post(`${this.marketPlaceCartUrl}/createcart`, cart, {responseType: 'text'}).pipe(
      catchError(this.handleError)
    );

  }


  private handleError(err: HttpErrorResponse){
    let errorMsg = '';
    if (err.error instanceof ErrorEvent){
        errorMsg = `An error occurred: ${err.error.message}`;
    } else {
        errorMsg = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    alert("An error has occurred! Order has not been placed.");
    console.error(errorMsg);
    return throwError(()=>errorMsg);
}   
}
