import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  
  // checkoutForm = new FormGroup({
  //   deliveryAddress: new FormGroup({
  //     deliveryFirstName: new FormControl(''),
  //     deliveryLastName: new FormControl(''),
  //     deliveryAddress1: new FormControl(''),
  //     deliveryAddress2: new FormControl(''),
  //     deliveryCity: new FormControl(''),
  //     deliveryState: new FormControl(''),
  //     deliveryZip: new FormControl(''),
  //   }),
  //   payment: new FormGroup({
  //     cardholderName: new FormControl(''),
  //     cardNumber: new FormControl(''),
  //     cardType: new FormControl(''),
  //     cardExpireDate: new FormControl(''),
  //     cardCvv: new FormControl(''),
  //   }),
  //   billingAddress: new FormGroup({
  //     billingFirstName: new FormControl(''),
  //     billingLastName: new FormControl(''),
  //     billingAddress1: new FormControl(''),
  //     billingAddress2: new FormControl(''),
  //     billingCity: new FormControl(''),
  //     billingState: new FormControl(''),
  //     billingZip: new FormControl(''),
  //   }),
  // });

  //The above code snippet is the same as the one below

  checkoutForm = this.fb.group({
    deliveryAddress: this.fb.group({
      deliveryFirstName: [''],
      deliveryLastName: [''],
      deliveryAddress1: [''],
      deliveryAddress2: [''],
      deliveryCity: [''],
      deliveryState: [''],
      deliveryZip: [''],
    }),
    payment: this.fb.group({
      cardholderName: [''],
      cardNumber: [''],
      cardType: [''],
      cardExpireDate: [''],
      cardCvv: [''],
    }),
    billingAddress: this.fb.group({
      billingFirstName: [''],
      billingLastName: [''],
      billingAddress1: [''],
      billingAddress2: [''],
      billingCity: [''],
      billingState: [''],
      billingZip: [''],
    }),
  })

  sameAsDelivery: Boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.checkoutForm.value);
  }
}
