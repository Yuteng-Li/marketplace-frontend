import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //change to an actual server when that is running
  baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProductById(id:string){
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }
  getProduct(){
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }
}