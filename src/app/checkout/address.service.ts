import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Address } from '../shared/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = 'http://localhost:8080/api/address/getAllAddresses';
  constructor(private http: HttpClient) { 
  }

  getAllAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(this.baseUrl)
  }
}
