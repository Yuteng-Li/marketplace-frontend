import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //url from inventory team api
  private productUrl = "http://localhost:8080/api/products";
  constructor(private http:HttpClient){}

  getProductsId(id: String) : Observable<any>{ 
    return this.http.get<any>(`${this.productUrl}/getProducts/${id}`); 
  }
}
