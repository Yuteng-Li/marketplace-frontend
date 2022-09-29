import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CcserviceService {

  private productUrl = "http://localhost:8080/api/creditCard";
  constructor(private http:HttpClient){}
  
  getCC(id: number) : Observable<any>{ 
    return this.http.get<any>(`${this.productUrl}/getCard/${id}`); 
  }
}
