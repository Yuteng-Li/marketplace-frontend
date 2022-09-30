import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from './shared/Product';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8081/api/products';

  public itemGridCatProduct:Product[]=[];

  constructor(private http: HttpClient) { }

  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/fetchAllItems`).pipe(
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
    return this.http.get<Product[]>(`${this.baseUrl}/fetchAllItems`);
  }
  getProducts(params : HttpParams){
    return this.http.get<any>(`${this.baseUrl}/get/`, {params: params});
  }
}

