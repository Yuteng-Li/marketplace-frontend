import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.component.service';
import { ShoppingCart } from '../cart/cart.component.shopcartmodel';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { Order } from '../shared/Order';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CreditCardService } from '../credit-card/credit-card.component.service'
import { CreditCard } from '../credit-card/credit-card.component.credit-card-model';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartItems!: ShoppingCart[];
  total: number = 0;
  order!: Order;
  user!: User;
  cards!: CreditCard[];
  constructor(private cartService: CartService, private orderService: OrderService,
      private router: Router, private authService: SocialAuthService,
      private userService : UserService, private cardService : CreditCardService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      /*Get User info from User API*/
      this.userService.getUsersByEmail(user.email).subscribe((user: User) => {
        this.user = user;
        
        /*Get Items from Cart API*/
        //this.cartService.getCartbyId(UserID);
        this.cartItems = this.cartService.shoppingCartArray;
        this.getTotal();
        /*Get Card info from CreditCard API*/
        this.cardService.getAllCards().subscribe((cards: CreditCard[]) => this.cards = cards);
        /*Get Addresses from Address API*/
        //this.addresses = ...
      });
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
    this.cartItems.forEach((item : ShoppingCart) => {
      this.total += item.itemPrice * item.itemQty;
    });
  }

}
