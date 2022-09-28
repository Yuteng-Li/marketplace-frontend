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

import { Address } from '../shared/address';
import { AddressService } from './address.service';
import { UserService} from '../user.service'
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  socialUser!: SocialUser;
  user: any;
  sameAsDelivery: Boolean = false;
  checkoutForm!: FormGroup;
  userAddresses: Address[] = [];
  selectedAddressID?: Number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: SocialAuthService,
    private addressService: AddressService,
    private userService: UserService,
  ) {
    this.checkoutForm = this.fb.group({
      // userAddress: [''],
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
        billingAddress1: ['', Validators.required],
        billingAddress2: [''],
        billingCity: ['', Validators.required],
        billingState: ['', Validators.required],
        billingZip: ['', Validators.required],
      }),
    });
  }

  // get userAddress() {
  //   return this.checkoutForm.get('userAddress')!;
  // }
  get deliveryFirstName() {
    return this.checkoutForm.get('deliveryAddress.deliveryFirstName')!;
  }
  get deliveryLastName() {
    return this.checkoutForm.get('deliveryAddress.deliveryLastName')!;
  }
  get deliveryAddress1() {
    return this.checkoutForm.get('deliveryAddress.deliveryAddress1')!;
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
  get billingAddress1() {
    return this.checkoutForm.get('billingAddress.billingAddress1')!;
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
    
    this.authService.authState.subscribe(users => {
      
    })
    
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(user);
    });

    console.log(this.socialUser.email)
    this.userService.getUsersByEmail(this.socialUser.email).subscribe((users) => {
      users.forEach((user:any) => {
        this.user = user;
        console.log(this.user);
      })
    });

    this.addressService.getAllAddresses().subscribe((addresses) => {
      addresses.forEach((address) => {
        //USER ID IS HARDCODED, CHANGE LATER
        if (address.user_id == 1) {
          console.log('pushing new address: ');
          console.log(address)
          this.userAddresses.push(address);
        }
      });
    });
    console.log(this.userAddresses);
    // this.userAddresses.forEach(address => {
    //   this.addressService.getById(address.address_id).subscribe((address) => {
    //   })
    // });
  }

  onSubmit(): void {
    if(this.sameAsDelivery === true){
      this.setBillingAddressAsDelivery();
    }

    
  }

  setBillingAddressAsDelivery(){
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
  }

  clickedSameAsDelivery(): void {
    this.sameAsDelivery = !this.sameAsDelivery;
    if (this.sameAsDelivery == true) {
      this.setBillingAddressAsDelivery(); 
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

  autoFillAddress(address: Address): void {
    const fullName = address.recipient_name.split(' ');
    this.deliveryFirstName.setValue(fullName[0]);
    this.checkoutForm.get('deliveryAddress.deliveryLastName')?.setValue(fullName[1]);
    this.checkoutForm.get('deliveryAddress.deliveryAddress1')?.setValue(address.street);
    this.checkoutForm.get('deliveryAddress.deliveryAddress2')?.setValue(address.street2);
    this.checkoutForm.get('deliveryAddress.deliveryCity')?.setValue(address.city);
    this.checkoutForm.get('deliveryAddress.deliveryState')?.setValue(address.state);
    this.checkoutForm.get('deliveryAddress.deliveryZip')?.setValue(address.zip);
  }
}
