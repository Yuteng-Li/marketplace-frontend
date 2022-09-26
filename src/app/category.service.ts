import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CATEGORIES } from './mock-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() { }

  /**
   * Gets categories from backend
   * -REFACTOR WITH HTTP GET WITH PROVIDED ENDPOINT-
   * @returns Observable with list of categories from api
   */
  getCategories(): Observable<any[]>{
    const categories = of(CATEGORIES);
    return categories;
  }
}
