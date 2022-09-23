import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { filter } from 'rxjs/operators';
import { Address } from '../shared/address';
import { AddressService } from './address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  user!: SocialUser;
  sameAsDelivery: Boolean = false;
  checkoutForm: FormGroup;
  userAddresses: Address[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: SocialAuthService,
    private addressService: AddressService
  ) {
    this.checkoutForm = this.fb.group({
      deliveryAddress: this.fb.group({
        deliveryFirstName: ['', Validators.required],
        deliveryLastName: ['', Validators.required],
        deliveryAddress1: ['', Validators.required],
        deliveryAddress2: [''],
        deliveryCity: ['', Validators.required],
        deliveryState: ['', Validators.required],
        deliveryZip: ['', Validators.required],
      }),
      payment: this.fb.group({
        cardholderName: ['', Validators.required],
        cardNumber: ['', Validators.required],
        //cardType: ['', Validators.required],
        cardExpireDate: ['', Validators.required],
        cardCvv: ['', Validators.required],
      }),
      billingAddress: this.fb.group({
        billingFirstName: ['', Validators.required],
        billingLastName: ['', Validators.required],
        billingAddress1: ['', Validators.required],
        billingAddress2: [''],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZip: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });

    this.addressService.getAllAddresses().subscribe((addresses) => {
      addresses.forEach((address) => {
        if (address.userID == 1) {
          this.userAddresses.push(address);
        }
      });
    });
    console.log(this.userAddresses);
  }

  onSubmit(): void {
    console.warn(this.checkoutForm.value);
  }

  clickedSameAsDelivery(): void {
    this.sameAsDelivery = !this.sameAsDelivery;
    if (this.sameAsDelivery == true) {
      this.checkoutForm
        .get('billingAddress.billingFirstName')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryFirstName')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingLastName')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryLastName')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingAddress1')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryAddress1')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingAddress2')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryAddress2')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingCity')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryCity')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingState')
        ?.setValue(
          this.checkoutForm.get('deliveryAddress.deliveryState')?.value
        );
      this.checkoutForm
        .get('billingAddress.billingZip')
        ?.setValue(this.checkoutForm.get('deliveryAddress.deliveryZip')?.value);
    } else {
      this.checkoutForm.get('billingAddress.billingFirstName')?.setValue('');
      this.checkoutForm.get('billingAddress.billingLastName')?.setValue('');
      this.checkoutForm.get('billingAddress.billingAddress1')?.setValue('');
      this.checkoutForm.get('billingAddress.billingAddress2')?.setValue('');
      this.checkoutForm.get('billingAddress.billingCity')?.setValue('');
      this.checkoutForm.get('billingAddress.billingState')?.setValue('');
      this.checkoutForm.get('billingAddress.billingZip')?.setValue('');
    }
  }
}
