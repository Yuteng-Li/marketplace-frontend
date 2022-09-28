import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/Category';
import { CATEGORIES } from '../categories/mock-categories';

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

  constructor(private authService: SocialAuthService, private categoryService: CategoryService) { }

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

}
