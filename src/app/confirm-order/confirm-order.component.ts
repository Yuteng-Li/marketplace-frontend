import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.component.service';
import { ShoppingCart } from '../cart/cart.component.shopcartmodel';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { Order, OrderItem } from '../shared/Order';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from '../user.service';
import { User } from '../shared/User';
import { CreditCardService } from '../credit-card/credit-card.component.service'
import { CreditCard } from '../shared/CreditCard';
import { AddressService } from '../checkout/address.service';
import { CheckoutDataService } from '../checkout-data.service';
import { Address } from '../shared/Address';

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
  card!: CreditCard;
  address!: Address;
  billing!: Address;
  orderItems!: OrderItem[];
  constructor(private cartService: CartService, private orderService: OrderService,
      private router: Router, private authService: SocialAuthService,
      private userService : UserService, private cardService : CreditCardService,
      private addressService : AddressService, private checkoutService: CheckoutDataService) { }

  ngOnInit(): void {
    //Get user identifier from auth, then get relavant user data ( user, cart, cards, address)
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      /*Get User info from User API*/
      this.userService.getUsersByEmail(user.email).subscribe((user: User) => {
        this.user = user;
        
        /*Get Items from Cart API*/
        //this.cartService.getCartbyId(UserID);
        this.cartItems = this.cartService.shoppingCartArray;
        this.setTotal();
        /*Get Card info from CreditCard API*/
        this.checkoutService.currentCreditCard.subscribe((card: CreditCard) => this.card = card);
        /*Get Addresses from Address API*/
        this.checkoutService.currentDeliveryAddress.subscribe((address: Address)=> this.address = address);
        this.checkoutService.currentBillingAddress.subscribe((address:Address)=> this.billing=address);
      });
    });
  }

  placeOrder(): void {
    /*Section for testing, if user is not logged in - scenario not possible*/
    if(this.user == undefined){
      this.user = {first_name: "a", last_name: "b", email: "email", user_id: 13, user_password: "pass", phone: "0000000000"};
    }
    if(this.cartItems == undefined || this.cartItems.length === 0){
      this.cartItems = [{itemUpc:"a", itemDesc: "a", itemImgUrl: "None", itemName: "a", itemPrice: 9.99, itemQty: 1}];
    }

    //create orderItems list from cartItems
    this.orderItems = [];
    //do a if check here to make sure item is not 0
    this.cartItems.forEach((item: ShoppingCart) => {
      if (item.itemQty!=0){
      let orderItem = {
        quantity: item.itemQty,
        upc: item.itemUpc
      };
      this.orderItems.push(orderItem);
    }
    });
    //create order to post
    this.order = { 
      price: this.total, 
      userId: this.user.user_id, 
      addressID: this.address.address_id,
      creditCardID: this.card.credit_card_id,
      orderItems: this.orderItems 
    };
    //post to OMS
    console.log(this.order);
    this.orderService.placeOrder(this.order).subscribe(
      (order: Order) => {
        //on success response
        alert("Order has been submitted");
        //this.cartService.empty() ->      TODO: EMPTY CART ON SUCCESSFUL ORDER
        this.router.navigate(["/home-page"]);
      } 
    );
  }

  setTotal(): void{
    this.cartItems.forEach((item : ShoppingCart) => {
      this.total += item.itemPrice * item.itemQty;
    });
  }


}
