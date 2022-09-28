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

import { Address } from '../shared/Address';
import { AddressService } from './address.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CreditCard } from '../shared/CreditCard';
import { CreditCardService } from '../credit-card/credit-card.component.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  socialUser!: SocialUser;
  userID!: Number;
  sameAsDelivery: Boolean = false;
  checkoutForm!: FormGroup;
  userAddresses: Address[] = [];
  userCreditCards: CreditCard[] = [];
  selectedAddress: Address | undefined ;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: SocialAuthService,
    private addressService: AddressService,
    private userService: UserService,
    private creditCardService: CreditCardService
  ) {
    this.checkoutForm = this.fb.group({
      // userAddress: [''],
      deliveryAddress: this.fb.group({
        deliveryFirstName: ['', Validators.required],
        deliveryLastName: ['', Validators.required],
        deliveryStreet1: ['', Validators.required],
        deliveryStreet2: [''],
        deliveryCity: ['', Validators.required],
        deliveryState: ['', Validators.required],
        deliveryZip: ['', Validators.required],
      }),
      payment: this.fb.group({
        cardholderName: ['', Validators.required],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{16}')],
        ],
        //cardType: ['', Validators.required],
        cardExpireDate: ['', Validators.required],
        cardCvv: ['', Validators.required],
      }),
      billingAddress: this.fb.group({
        billingFirstName: ['', Validators.required],
        billingLastName: ['', Validators.required],
        billingStreet1: ['', Validators.required],
        billingStreet2: [''],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZip: ['', Validators.required],
      }),
    });
  }

  // Getters for the formControls for the frontend
  get deliveryFirstName() {
    return this.checkoutForm.get('deliveryAddress.deliveryFirstName')!;
  }
  get deliveryLastName() {
    return this.checkoutForm.get('deliveryAddress.deliveryLastName')!;
  }
  get deliveryStreet1() {
    return this.checkoutForm.get('deliveryAddress.deliveryStreet1')!;
  }
  get deliveryStreet2() {
    return this.checkoutForm.get('deliveryAddress.deliveryStreet2')!;
  }
  get deliveryCity() {
    return this.checkoutForm.get('deliveryAddress.deliveryCity')!;
  }
  get deliveryState() {
    return this.checkoutForm.get('deliveryAddress.deliveryState')!;
  }
  get deliveryZip() {
    return this.checkoutForm.get('deliveryAddress.deliveryZip')!;
  }

  get cardNumber() {
    return this.checkoutForm.get('payment.cardNumber')!;
  }
  get cardholderName() {
    return this.checkoutForm.get('payment.cardholderName')!;
  }
  get cardExpireDate() {
    return this.checkoutForm.get('payment.cardExpireDate')!;
  }
  get cardCvv() {
    return this.checkoutForm.get('payment.cardCvv')!;
  }

  get billingFirstName() {
    return this.checkoutForm.get('billingAddress.billingFirstName')!;
  }
  get billingLastName() {
    return this.checkoutForm.get('billingAddress.billingLastName')!;
  }
  get billingStreet1() {
    return this.checkoutForm.get('billingAddress.billingStreet1')!;
  }
  get billingStreet2() {
    return this.checkoutForm.get('billingAddress.billingStreet2')!;
  }
  get billingCity() {
    return this.checkoutForm.get('billingAddress.billingCity')!;
  }
  get billingState() {
    return this.checkoutForm.get('billingAddress.billingState')!;
  }
  get billingZip() {
    return this.checkoutForm.get('billingAddress.billingZip')!;
  }

  ngOnInit(): void {
    this.authService.authState
      .pipe(
        concatMap((user) => {
          console.log('Getting google user...');
          this.socialUser = user;
          return this.userService.getUsersByEmail(user.email);
        })
      )
      .pipe(
        concatMap((retUser) => {
          console.log('Getting user from API...');
          this.userID = retUser.user_id;
          return this.creditCardService.getAllCards();
        })
      )
      .pipe(
        concatMap((cards: CreditCard[]) => {
          console.log('Adding credit card...');
          cards.forEach((card) => {
            if (this.userID === card.user_id) {
              console.log(
                'Got Credit card from user with last 4 digits =' +
                  card.last_four_card_number
              );
              this.userCreditCards.push(card);
            }
          });
          return this.addressService.getAllAddresses();
        })
      )
      .subscribe((ret) => {
        console.log('Getting user addresses...');
        ret.forEach((address) => {
          if (this.userID === address.user_id) {
            console.log('Got address from user with street: ' + address.street);
            this.userAddresses.push(address);
          }
        });
      });
  }

  onSubmit(): void {
    if (this.sameAsDelivery === true) {
      this.setBillingAddressAsDelivery();
    }
    const dAddress:Address = new Address();
    dAddress.user_id = this.userID;
    dAddress.is_shipping = true;
    dAddress.is_billing = false;
    dAddress.recipient_name = this.deliveryFirstName.value + this.deliveryLastName.value;
    dAddress.street = this.deliveryStreet1.value;
    dAddress.street2 = this.deliveryStreet2.value;
    dAddress.city = this.deliveryCity.value;
    dAddress.state = this.deliveryState.value;
    dAddress.zip = this.deliveryZip.value;
    
    const bAddress:Address = new Address();
    bAddress.user_id = this.userID;
    bAddress.is_shipping = false;
    bAddress.is_billing = true;
    bAddress.recipient_name = this.deliveryFirstName.value + this.deliveryLastName.value;
    bAddress.street = this.deliveryStreet1.value;
    bAddress.street2 = this.deliveryStreet2.value;
    bAddress.city = this.deliveryCity.value;
    bAddress.state = this.deliveryState.value;
    bAddress.zip = this.deliveryZip.value;
  }

  setBillingAddressAsDelivery(): void {
    this.billingFirstName.setValue(this.deliveryFirstName.value);
    this.billingLastName.setValue(this.deliveryLastName.value);
    this.billingStreet1.setValue(this.deliveryStreet1.value);
    this.billingStreet2.setValue(this.deliveryStreet2.value);
    this.billingCity.setValue(this.deliveryCity.value);
    this.billingState.setValue(this.deliveryState.value);
    this.billingZip.setValue(this.deliveryZip?.value);
  }

  clickedSameAsDelivery(): void {
    this.sameAsDelivery = !this.sameAsDelivery;
    if (this.sameAsDelivery == true) {
      this.setBillingAddressAsDelivery();
    } else {
      this.billingFirstName.setValue('');
      this.billingLastName.setValue('');
      this.billingStreet1.setValue('');
      this.billingStreet2.setValue('');
      this.billingCity.setValue('');
      this.billingState.setValue('');
      this.billingZip.setValue('');
    }
  }

  autoFillAddress(address: Address): void {
    this.selectedAddress = address;
    const fullName = address.recipient_name.split(' ');
    this.deliveryFirstName.setValue(fullName[0]);
    this.deliveryLastName.setValue(fullName[1]);
    this.deliveryLastName.setValue(fullName[1]);
    this.deliveryStreet1.setValue(address.street);
    this.deliveryStreet2.setValue(address.street2);
    this.deliveryCity.setValue(address.city);
    this.deliveryState.setValue(address.state);
    this.deliveryZip.setValue(address.zip);
    this.setBillingAddressAsDelivery();
  }
  autoFillCard(card: CreditCard) {
    this.cardholderName.setValue(card.cardholder_name);
    this.cardExpireDate.setValue(card.expiration_month + "/" + card.expiration_year);
  }
}
