import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm = new FormGroup({
    deliveryFirstName: new FormControl(''),
    deliveryLastName: new FormControl(''),
    deliveryAddress1: new FormControl(''),
    deliveryAddress2: new FormControl(''),
    deliveryCity: new FormControl(''),
    deliveryState: new FormControl(''),
    deliveryZip: new FormControl(''),
    cardholderName: new FormControl(''),
    cardNumber: new FormControl(''),
    cardType: new FormControl(''),
    cardExpireDate: new FormControl(''),
    cardCvv: new FormControl(''),
    billingFirstName: new FormControl(''),
    billingLastName: new FormControl(''),
    billingAddress1: new FormControl(''),
    billingAddress2: new FormControl(''),
    billingCity: new FormControl(''),
    billingState: new FormControl(''),
    billingZip: new FormControl(''),
  })

  sameAsDelivery: Boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
