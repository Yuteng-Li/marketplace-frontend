import { Component, OnInit, ɵgetUnknownElementStrictMode } from '@angular/core';
import { PreviousOrdersService } from './previous-orders.service';

import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css'],
})
export class PreviousOrdersComponent implements OnInit {
  previousOrders: any = [];
  constructor(private previousOrdersService: PreviousOrdersService,private authService: SocialAuthService) {}
  invalidDate: Date = new Date(0);

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
  user!: SocialUser;
  ngOnInit(): void {
    this.getPreviousOrders();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }



  signOut(): void {
    this.authService.signOut();
  }

  getPreviousOrdersUser(userID: number) {
    this.previousOrdersService
      .getPrevOrders(userID)
      .subscribe((previousOrders) => {
        this.previousOrders = previousOrders;
        console.log(this.previousOrders);
      });
    this.previousOrders.sort((a: any, b: any) => {
      return (
        new Date(b.DateOrdered).getTime() - new Date(a.DateOrdered).getTime()
      );
    });
  }

  cancelPreviousOrder(orderID: number, userID: number) {
    this.previousOrdersService.cancelOrder(orderID).subscribe((data) => {
      console.log(data);
      this.getPreviousOrdersUser(userID);
    });
  }
}

