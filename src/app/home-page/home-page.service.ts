import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Category } from '../shared/Category';
import { CATEGORIES } from '../categories/mock-categories';
import { ItemService } from '../item.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  baseUrl = 'http://localhost:8081/api/products';

  constructor(private http: HttpClient, private itemService:ItemService) { }

  getCategories(): Observable<Category[]>{
    const categories = of(CATEGORIES);
    return categories;
  }

  getProduct(){
    return this.itemService.getProduct();
  }

}
