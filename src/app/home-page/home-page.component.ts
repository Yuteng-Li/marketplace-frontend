import { Component, OnInit} from '@angular/core';

import { CategoryService } from '../categories/category.service';
import { Category } from '../shared/Category';

import { Product } from '../shared/Product';
import { CartService } from '../cart/cart.component.service';
import { ItemService } from '../item.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user!: SocialUser;
  catCard : Category[] = [];
  featProds : Product[] = [];
  itemGridCatProduct:Product[]=[];
  localUser =  localStorage.getItem('user');



  constructor(private readonly authService: SocialAuthService, private categoryService: CategoryService,
    private itemService: ItemService, public cartService: CartService, private router: Router) { }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });

    if(this.user==null && this.localUser !=null && localStorage.getItem('user') !=null)
      {
        this.user = JSON.parse(this.localUser);

      }

    this.getCategories();
    this.DisplayAll();
  }

  goTOItemDisplayCat(category: string) {
    this.itemService.getProduct()
      .subscribe(productList => {
        this.itemGridCatProduct = productList.filter(productCat => productCat.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
        this.itemService.itemGridCatProduct = this.itemGridCatProduct;
        if (this.itemService.itemGridCatProduct.length > 0) { this.router.navigate(['/item-gird']); }
        else { alert("No items match category") }
      })
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((catCard: Category[]) => { this.catCard = catCard; console.log(this.catCard) });
  }

  DisplayAll() {
    this.itemService.getProduct().subscribe(featProd => {

      this.featProds = featProd;
    })
  }



}
