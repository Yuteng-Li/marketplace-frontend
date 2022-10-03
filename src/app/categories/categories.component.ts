import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from '../shared/Category';
import { CATEGORIES } from './mock-categories';
import { ItemService } from '../item.service';
import { Product } from '../shared/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories : Category[] = [];
  itemGridCatProduct: Product[] = [];

  constructor(public categoryService: CategoryService, private itemService: ItemService, private router:Router) { }

  ngOnInit(): void {
    //this.getCategories(); //Use if we are getting categories from the backend
    this.categories = CATEGORIES;
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( (categories: Category[]) => {this.categories = categories; console.log(this.categories)});
  }

  goTOItemDisplayCat(category:string){
    console.log("display the category: "+category);
    //have to send a itemGridProduct array to itemgrid, and
    //set itemgrid array product to itemGridCatprod
    this.itemService.getProduct()
                    .subscribe(productList=>{this.itemGridCatProduct=productList.filter(productCat=>productCat.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()));                                     
                                            this.itemService.itemGridCatProduct=this.itemGridCatProduct;                                      
                                            if (this.itemService.itemGridCatProduct.length>0){  this.router.navigate(['/item-gird']);}
                                            else{alert("No items match category") }
})
}

}
