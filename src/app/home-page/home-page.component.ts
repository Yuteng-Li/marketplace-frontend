import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../categories/category.service';
import { Category } from '../shared/Category';
import { CATEGORIES } from '../categories/mock-categories';

import { Product } from '../shared/Product';
import { CartService } from '../cart/cart.component.service';
import { ItemService } from '../item.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user!: SocialUser;
  catCard : Category[] = [];
  featProds : Product[] = [];

  constructor(private authService: SocialAuthService, private categoryService: CategoryService,
    private ItemService:ItemService, public cartService:CartService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    this.getCategories();
  }

  signOut(): void {
    this.authService.signOut();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe( (catCard: Category[]) => {this.catCard = catCard; console.log(this.catCard)});
  }

  DisplayAll(){
    this.ItemService.getProduct().subscribe(featProd => {
      this.featProds=featProd;
    })

  }

}
