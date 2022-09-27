

import { Component, OnInit, ɵgetUnknownElementStrictMode } from '@angular/core';
import { PreviousOrdersService } from './previous-orders.service';

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css'],
})
export class PreviousOrdersComponent implements OnInit {
  previousOrders: any = [];
  constructor(private previousOrdersService: PreviousOrdersService,private authService: SocialAuthService) {}
  invalidDate: Date = new Date(0);
  user!: SocialUser;

  getPreviousOrders(): void {
    this.previousOrdersService
      .getPreviousOrders()
      .subscribe((previousOrders) => {
        this.previousOrders = previousOrders;
        console.log(this.previousOrders);
      });
    this.previousOrders.sort((a: any, b: any) => {
      return (
        new Date(b.DateOrdered).getTime() - 
        new Date(a.DateOrdered).getTime()
      );
    });
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.getPreviousOrdersUser(5);
    //this.getAllPreviousOrders();
  }


  signOut(): void {
    this.authService.signOut();
  }

  getPreviousOrdersUser(user: number) {
 
    this.previousOrdersService
      .getPrevOrders(user)
      .subscribe((previousOrders) => {
        this.previousOrders = previousOrders
        .sort((a: any, b: any) => {
          return (
            new Date(b.dateOrdered).getTime() - new Date(a.dateOrdered).getTime()
          );
        });

        console.log(this.previousOrders);
      });
  }

  getAllPreviousOrders() {
 
    this.previousOrdersService
      .getAllPrevOrders()
      .subscribe((previousOrders) => {
        this.previousOrders = previousOrders
        
        .sort((a: any, b: any) => {
          return (
            new Date(b.dateOrdered).getTime() - new Date(a.dateOrdered).getTime()
          );
        });
        

        console.log(this.previousOrders);
      });
  }

  cancelPreviousOrder(orderID: number, userID: number) {
    this.previousOrdersService.cancelOrder(orderID).subscribe((data) => {
      console.log(data);
      this.getPreviousOrdersUser(userID);
    });
  }
}
