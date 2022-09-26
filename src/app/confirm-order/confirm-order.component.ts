import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.component.service';
import { OrderService } from './order.service';
import { NavigationExtras, Router } from '@angular/router';
import { Order } from './order';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartItems: any = [];
  order!: Order;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  placeOrder(): void {
    this.orderService.placeOrder(this.order).subscribe(
      (order: Order) => {
        alert("Order # 123 has been placed!");
        this.router.navigate(["/home-page"]);
      } 
    );
  }

}
