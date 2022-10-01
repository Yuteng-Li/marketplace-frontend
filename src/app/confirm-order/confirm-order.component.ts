import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.component.service';
import { ShoppingCart } from '../cart/cart.component.shopcartmodel';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { BackEndCart, Order, OrderItem } from '../shared/Order';
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
  totalTax: number = 0;
  cartSubtotal:number = 0;
  totalPrice: number = 0;
  numItems: number = 0;
  order!: Order;
  user!: User;
  card!: CreditCard;
  address!: Address;
  billing!: Address;
  orderItems!: OrderItem[];
  taxRate:number=0.1;
  itemToCartBackEnd!:BackEndCart[];


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
        this.cartItems = this.cartService.shoppingCartArray.filter((item)=>{return item.itemQty>0});
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
      alert("cart is empty");
      return;
    }

    //create orderItems list from cartItems
    this.orderItems = [];
    this.cartItems.forEach((item: ShoppingCart) => {
      let orderItem = {
        quantity: item.itemQty,
        upc: item.itemUpc
      };
      this.orderItems.push(orderItem);
    });

    //create itemToCartBackEnd from cartItems
    this.itemToCartBackEnd=[];
    this.cartItems.forEach((item: ShoppingCart) => {
      let tempCart = {
        quantity: item.itemQty,
        upc: item.itemUpc,
        user_id:this.user.user_id
      };
      this.itemToCartBackEnd.push(tempCart);
    });

    //send post request to MarketPlace cartitem backend
    this.itemToCartBackEnd.forEach(cart=>{
      this.orderService.createCartInBackEnd(cart).subscribe()
    })

    //create order to post
    this.order = { 
      price: this.totalPrice, 
      user_id: this.user.user_id, 
      address_id: this.address.address_id,
      credit_card_id: this.card.credit_card_id,
      orderItems: this.orderItems 
    };
    //post to OMS
    console.log(this.order);
    this.orderService.placeOrder(this.order).subscribe(
      (order: Order) => {
        //on success response
        alert("Order has been submitted");
        this.cartService.emptyCart();       //TODO: EMPTY CART ON SUCCESSFUL ORDER
        this.router.navigate(["/home-page"]);
      } 
    );
  }

  setTotal(): void{
    this.cartItems.forEach((item : ShoppingCart) => {
      this.numItems += item.itemQty;
      this.cartSubtotal += (item.itemPrice * item.itemQty)
    });
    this.totalTax +=  this.cartSubtotal * this.taxRate;
    this.totalPrice = this.cartSubtotal + this.totalTax;
  }


}
