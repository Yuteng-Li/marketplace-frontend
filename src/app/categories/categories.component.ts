import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../shared/Category';
import { CATEGORIES } from './mock-categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    //this.getCategories(); //Use if we are getting categories from the backend
    this.categories = CATEGORIES;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( (categories: Category[]) => {this.categories = categories; console.log(this.categories)});
  }

}
