import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Order } from '../shared/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //url from inventory team api
  private productUrl = "http://localhost:8081/api/order";

  constructor(private http:HttpClient){}

  placeOrder(order: Order):Observable<any>{
    return this.http.post(`${this.productUrl}/createOrder`, order, {responseType: 'text'}).pipe(
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
