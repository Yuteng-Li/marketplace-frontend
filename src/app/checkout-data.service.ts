import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from './shared/Address';
import { CreditCard } from './shared/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CheckoutDataService {

  private deliveryAddressSource = new BehaviorSubject(new Address());
  currentDeliveryAddress = this.deliveryAddressSource.asObservable()
  
  private billingAddressSource = new BehaviorSubject(new Address());
  currentBillingAddress = this.billingAddressSource.asObservable()

  private creditCardSource = new BehaviorSubject(new CreditCard());
  currentCreditCard = this.creditCardSource.asObservable();

  constructor() { }
  
  changeDeliveryAddress(address: Address): void {
    this.deliveryAddressSource.next(address);
  }
  changeBillingAddress(address: Address): void {
    this.billingAddressSource.next(address);
  }
  changeCreditCard(card: CreditCard): void {
    this.creditCardSource.next(card);
  }

  
}
