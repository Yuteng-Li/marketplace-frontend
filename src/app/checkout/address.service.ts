import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Address } from '../shared/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = 'http://localhost:8080/api/address/';
  constructor(private http: HttpClient) { 
  }

  getAllAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(this.baseUrl + "getAllAddresses")
  }

  getById(id: Number): Observable<Address>{
    return this.http.get<Address>(this.baseUrl + id)
  };
}
