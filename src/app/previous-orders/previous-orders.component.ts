import { Component, OnInit } from '@angular/core';
import { PreviousOrdersService } from '../previous-orders.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css'],
})
export class PreviousOrdersComponent implements OnInit {
  previousOrders: any = [];
  constructor(private previousOrdersService: PreviousOrdersService) {}

  getPreviousOrders(): void {
    this.previousOrdersService
      .getPreviousOrders()
      .subscribe((previousOrders) => {
        this.previousOrders = previousOrders;
        console.log(this.previousOrders);
      });
    this.previousOrders.sort((a: any, b: any) => {
      return (
        new Date(a.DateDelivered).getTime() -
        new Date(b.DateDelivered).getTime()
      );
    });
  }

  ngOnInit(): void {
    this.getPreviousOrders();
  }

}
