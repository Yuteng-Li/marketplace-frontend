import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.component.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { Order } from './Order';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartItems: any = [];
  total: number = 0;
  order!: Order;
  user!: SocialUser;
  constructor(private cartService: CartService, private orderService: OrderService,
     private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    /*Get Items from Cart API*/
    this.cartItems = this.cartService.shoppingCartArray;
    //this.getTotal();
    /*Get Card info from CreditCard API*/

    /*Get Addresses from Address API*/

    /*Get User info from User API*/
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      console.log(this.user);
    });
  }

  placeOrder(): void {
    this.orderService.placeOrder(this.order).subscribe(
      (order: Order) => {
        alert("Order # 123 has been placed!");
        this.router.navigate(["/home-page"]);
      } 
    );
  }

  getTotal(): void{
    this.cartItems.array.forEach((element: { itemPrice: number; itemQty: number; }) => {
      this.total += element.itemPrice * element.itemQty;
    });
  }

}
