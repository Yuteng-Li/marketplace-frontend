import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from './shared/Product';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //change to an actual server when that is running
  //Needed to change my localhost server
  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/fetchAllItems`).pipe(
      tap(data => console.log('Product[] Observable', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }
  getProduct() {
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }
  getProducts(params : HttpParams){
    return this.http.get<any>(`${this.baseUrl}/get/`, {params: params});
  }
}

