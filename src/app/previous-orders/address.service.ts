import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  //url from inventory team api
  private productUrl = "http://localhost:8080/api/address";
  constructor(private http:HttpClient){}

  getAddresses(id: number) : Observable<any>{ 
    return this.http.get<any>(`${this.productUrl}/getAddress/${id}`); 
  }
}
