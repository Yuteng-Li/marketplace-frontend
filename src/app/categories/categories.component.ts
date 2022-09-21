import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [
    {
      "category" : "Baby Care"
    },
    {
      "category" : "Beverages"
    },
    {
      "category" : "Bread & Bakery"
    },
    {
      "category" : "Breakfast & Cereal"
    },
    {
      "category" : "Canned Goods & Soups"
    },
    {
      "category" : "Condiments, Spice & Bake"
    },
    {
      "category" : "Cookies, Snacks & Candy"
    },
    {
      "category" : "Dairy, Eggs, & Cheese"
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    //logic to retrieve and assign categories
  }

}
