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
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CreditCard } from '../shared/CreditCard';
import { CreditCardService } from '../credit-card/credit-card.component.service';
import { CheckoutDataService } from '../checkout-data.service';
import { Router } from '@angular/router';
import { PaymentService } from '../payment-form/payment-form-component.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  socialUser!: SocialUser;
  userID!: number;
  sameAsDelivery: Boolean = false;
  checkoutForm!: FormGroup;
  userAddresses: Address[] = [];
  userCreditCards: CreditCard[] = [];
  selectedAddress: Address | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private addressService: AddressService,
    private userService: UserService,
    private creditCardService: CreditCardService,
    private dataService: CheckoutDataService,
    private paymentService: PaymentService,
    private router: Router
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
        deliveryZip: [
          '',
          [
            Validators.required,
            Validators.pattern('^\\d{5}(?:[-\\s]\\d{4})?$'),
          ],
        ],
      }),
      payment: this.fb.group({
        cardholderName: ['', Validators.required],
        cardNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{16}')],
        ],
        //cardType: ['', Validators.required],
        cardExpireDate: [
          '',
          [
            Validators.required,
            Validators.pattern('^((0[1-9])|(1[0-2]))/(\\d{2})$'),
          ],
        ],
        cardCvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      }),
      billingAddress: this.fb.group({
        billingFirstName: ['', Validators.required],
        billingLastName: ['', Validators.required],
        billingStreet1: ['', Validators.required],
        billingStreet2: [''],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZip: [
          '',
          [
            Validators.required,
            Validators.pattern('^\\d{5}(?:[-\\s]\\d{4})?$'),
          ],
        ],
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
    //Getting the user from the local storage.
    //I have this because getting the user from the authService was not working properly
    const localUser = localStorage.getItem('user');
    if (localUser != null) {
      this.socialUser = JSON.parse(localUser);
    }

    //This is a chain of http requests
    //It goes getting google user -> getting user from backend -> getting user's credit cards -> getting user's addresses
    this.userService
      .getUsersByEmail(this.socialUser.email)
      // .pipe(
      //   concatMap((user) => {
      //     console.log('Getting google user...');
      //     if (user != null) {
      //       this.socialUser = user;
      //     }
      //     return this.userService.getUsersByEmail(this.socialUser.email);
      //   })
      // )
      .pipe(
        concatMap((retUser) => {
          console.log('Getting user from API...');
          this.userID = retUser.user_id;
          return this.creditCardService.getAllCards();
        })
      )
      .pipe(
        concatMap((cards: CreditCard[]) => {
          console.log('Getting credit cards...');
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
          if (this.userID === address.user_id && address.is_shipping == true) {
            console.log('Got address from user with street: ' + address.street);
            this.userAddresses.push(address);
          }
        });
        console.log(this.userAddresses);
      });
  }

  onSubmit(): void {
    if (this.sameAsDelivery === true) {
      this.setBillingAddressAsDelivery();
    }
    const invalidFields = this.checkValidation();
    if (invalidFields.length > 0) {
      for (const field in invalidFields) {
        alert(`${field} is not valid`);
      }
    }
    //Creating the delivery address
    const dAddress: Address = new Address();
    dAddress.address_id = 0;
    dAddress.user_id = this.userID;
    dAddress.is_shipping = true;
    dAddress.is_billing = false;
    dAddress.recipient_name =
      this.deliveryFirstName.value + this.deliveryLastName.value;
    dAddress.street = this.deliveryStreet1.value;
    dAddress.street2 = this.deliveryStreet2.value;
    dAddress.city = this.deliveryCity.value;
    dAddress.state = this.deliveryState.value;
    dAddress.zip = this.deliveryZip.value;

    //Getting the address id if it exists in the database
    //else if it does not exist in the database, then create a new address
    const dID = this.getAddressID(dAddress);
    if (dID == -1) {
      this.addressService.createAddress(dAddress).subscribe((createdAddy) => {
        dAddress.address_id = createdAddy.address_id;
        //This is sending data to the service so that confirm-order can use it
        this.dataService.changeDeliveryAddress(dAddress);
      });
    } else {
      dAddress.address_id = dID;
      //This is sending data to the service so that confirm-order can use it
      this.dataService.changeDeliveryAddress(dAddress);
    }
    console.log(`Delivery address ID = ${dAddress.address_id}`);

    //Creating the billing address
    const bAddress: Address = new Address();
    bAddress.address_id = 0;
    bAddress.user_id = this.userID;
    bAddress.is_shipping = false;
    bAddress.is_billing = true;
    bAddress.recipient_name =
      this.deliveryFirstName.value + this.deliveryLastName.value;
    bAddress.street = this.deliveryStreet1.value;
    bAddress.street2 = this.deliveryStreet2.value;
    bAddress.city = this.deliveryCity.value;
    bAddress.state = this.deliveryState.value;
    bAddress.zip = this.deliveryZip.value;

    //Getting the address id if it exists in the database
    //else if it does not exist in the database, then create a new address
    const bID = this.getAddressID(bAddress);
    if (bID == -1) {
      this.addressService.createAddress(bAddress).subscribe((createdAddy) => {
        console.log(createdAddy);
        bAddress.address_id = createdAddy.address_id;
        this.dataService.changeBillingAddress(bAddress);
      });
    } else {
      bAddress.address_id = bID;
      this.dataService.changeBillingAddress(bAddress);
    }
    console.log(`billing addy id = ${bAddress.address_id}`);

    //Creating the credit card
    const card: CreditCard = new CreditCard();
    card.credit_card_id = 0;
    card.user_id = this.userID;
    card.cardholder_name = this.cardholderName.value;
    const expiration_date = this.cardExpireDate.value.split('/');
    card.expiration_month = expiration_date[0];
    card.expiration_year = expiration_date[1];
    card.last_four_card_number = this.cardNumber.value.slice(-4);

    //Getting the card id if it exists in the database
    //else if it does not exist in the database, then create a new card
    const cID = this.getCreditCardID(card);
    if (cID == -1) {
      this.paymentService.addCard(card).subscribe((ret) => {
        console.log(`created card id = ${ret.credit_card_id}`);
        card.credit_card_id = ret.credit_card_id;

        //This is sending data to the service so that confirm-order can use it
        this.dataService.changeCreditCard(card);
      });
    } else {
      card.credit_card_id = cID;

      //This is sending data to the service so that confirm-order can use it
      this.dataService.changeCreditCard(card);
    }

    this.router.navigate(['/confirm-order']);
  }

  getAddressID(address: Address): number {
    for (const addy of this.userAddresses) {
      if (address.street == addy.street && address.zip == addy.zip) {
        return addy.address_id;
      }
    }
    return -1;
  }

  getCreditCardID(card: CreditCard): number {
    for (const userCard of this.userCreditCards) {
      if (card.last_four_card_number == userCard.last_four_card_number) {
        return userCard.credit_card_id;
      }
    }
    return -1;
  }

  checkValidation(): string[] {
    const invalid = [];
    const controls = this.checkoutForm.controls;
    console.log(controls);
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name);
        invalid.push(name);
      }
    }
    console.log(invalid);
    return invalid;
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
    this.cardExpireDate.setValue(
      card.expiration_month + '/' + card.expiration_year
    );
  }

  cancel():void {
    this.router.navigate(['/cart']);
  }
}
