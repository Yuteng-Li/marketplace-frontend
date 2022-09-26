import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //url from inventory team api
  private productUrl = "http://localhost:8081/api/orders";

  constructor(private http:HttpClient){}

  placeOrder(order: Order):Observable<any>{
    return of({'text': 'sample'});
    return this.http.post<Order>(`${this.productUrl}/createOrder`, order).pipe(
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
