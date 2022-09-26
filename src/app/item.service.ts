import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //change to an actual server when that is running
  //Needed to change my localhost server
  private baseUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getAll() : Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  getSearchProductName(){
    const response = new Promise(resolve => [
      this.http.get(`${this.baseUrl}/fetchAllItems`).subscribe(data =>{
        resolve(data);
      }, err => {
        console.log(err);
      })
    ]);
    return response
  }

  getProductById(id:string){
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }
  getProduct(){
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }
}

