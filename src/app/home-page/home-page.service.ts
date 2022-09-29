import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Category } from '../shared/Category';
import { CATEGORIES } from '../categories/mock-categories';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  baseUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    const categories = of(CATEGORIES);
    return categories;
  }

  getProduct(){
    return this.http.get<any>(`${this.baseUrl}/fetchAllItems`);
  }

}
