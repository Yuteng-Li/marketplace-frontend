import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './shared/Product';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //change to an actual server when that is running
  baseUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) {}

  getProductById(id:string){
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }
  getProduct(){
    return this.http.get<Product[]>(`${this.baseUrl}/fetchAllItems`);
  }
  getProducts(params : HttpParams){
    return this.http.get<any>(`${this.baseUrl}/get/`, {params: params});
  }
}
