import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {
  today = new Date();
  yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
  dayBeforeYesterday = new Date((new Date()).valueOf() - 1000*60*60*24*2);
  previousOrders = [
    {
      "OrderID": 1,
      "UserID": 1,
      "AddressID": 1,
      "Price": 4.99,
      "CreditCardID": 1,
      "DateOrdered": this.dayBeforeYesterday,
      "DateShipped": this.yesterday,
      "DateDelivered": this.today,
      "OrderStatus": "Delivered"
    },
    {
      "OrderID": 2,
      "UserID": 2,
      "AddressID": 2,
      "Price": 3.99,
      "CreditCardID": 2,
      "DateOrdered": this.dayBeforeYesterday,
      "DateShipped": this.yesterday,
      "DateDelivered": this.today,
      "OrderStatus": "In Progress"
    },
    {
      "OrderID": 3,
      "UserID": 3,
      "AddressID": 3,
      "Price": 5.99,
      "CreditCardID": 3,
      "DateOrdered": this.dayBeforeYesterday,
      "DateShipped": this.yesterday,
      "DateDelivered": this.today,
      "OrderStatus": "Out For Delivery"
    },
    {
      "OrderID": 4,
      "UserID": 4,
      "AddressID": 4,
      "Price": 8.99,
      "CreditCardID": 4,
      "DateOrdered": this.dayBeforeYesterday,
      "DateShipped": this.yesterday,
      "DateDelivered": this.today,
      "OrderStatus": "Not Shipped Yet"
    }
  ]
  emptyList = []

  constructor() { }

  ngOnInit(): void {
  }

}