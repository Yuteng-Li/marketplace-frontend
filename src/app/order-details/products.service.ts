import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //url from inventory team api
<<<<<<< HEAD
  private productUrl = "http://localhost:8080/api/products"; // Inventory Backend
=======
  private productUrl = "http://localhost:8081/api/products";
>>>>>>> 5ca718b427c0e7aed69e362da0afb9007d836b41
  constructor(private http:HttpClient){}

  getProductsId(id: String) : Observable<any>{ 
    return this.http.get<any>(`${this.productUrl}/get/${id}`); 
  }
}
