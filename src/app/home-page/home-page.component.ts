import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../categories/category.service';
import { Category } from '../shared/Category';
import { CATEGORIES } from '../categories/mock-categories';

import { Product } from '../shared/Product';
import { CartService } from '../cart/cart.component.service';
import { ItemService } from '../item.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  //localUser =  localStorage.getItem('user');
  user!: SocialUser;
  catCard : Category[] = [];
  featProds : Product[] = [];

  constructor(private readonly authService: SocialAuthService, private categoryService: CategoryService,
    private itemService:ItemService, public cartService:CartService) { }

  ngOnInit() {
    // if(this.localUser!=null)
    // {
    //   this.user= JSON.parse(this.localUser);
    // }
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    this.getCategories();
    this.DisplayAll();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( (catCard: Category[]) => {this.catCard = catCard; console.log(this.catCard)});
  }

  DisplayAll(){
    this.itemService.getProduct().subscribe(featProd => {
      this.featProds=featProd;
      console.log(this.featProds);
    })
  }

}
