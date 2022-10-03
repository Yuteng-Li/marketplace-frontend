import { CreditCardService } from '../credit-card/credit-card.component.service';
import { CreditCard } from '../shared/CreditCard';
import { BehaviorSubject, catchError, combineLatest, concat, first, flatMap, forkJoin, map, mergeMap, Observable, of, switchMap, zip } from 'rxjs';

import { Component, OnInit, ɵgetUnknownElementStrictMode } from '@angular/core';
import { PreviousOrdersService } from './previous-orders.service';

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AddressService } from './address.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css'],
})
export class PreviousOrdersComponent implements OnInit {
  previousOrders: any = [];
  addresses: any = [];
  CCs: any = [];
  reload: any = null;
  
  myData: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private previousOrdersService: PreviousOrdersService,private authService: SocialAuthService,
    private addressService: AddressService, private ccService: CreditCardService) {}
  user!: SocialUser;
  localUser =  localStorage.getItem('user');


  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if(user==null && this.localUser !=null)
      {
        this.user = JSON.parse(this.localUser);
      }else
      {
        this.user=user;
      }
    });    
    this.getCombined();
  }


  async getCombined() {
    console.log("getCombined")
    this.previousOrdersService.getPrevOrders(this.user.id).subscribe((previousOrders) => {
      this.myData.next(previousOrders)
      this.previousOrders = previousOrders
      .sort((a: any, b: any) => {
        return (
          new Date(b.dateOrdered).getTime() - new Date(a.dateOrdered).getTime()
        );
      });

      this.myData.pipe(switchMap(data => {
        return combineLatest(data.map((x: { addressID: number; }) => 
        this.addressService.getAddresses(x.addressID)
         ));
    }))        
    .subscribe((add: any) => {
        this.addresses = add;
        //console.log(this.addresses, "yooo")
    });

      //console.log(this.previousOrders, "prevOrders");


      this.myData.pipe(switchMap(data => {
        return combineLatest(data.map((x: { creditCardID: number; }) => 
        this.ccService.getCC(x.creditCardID)
         ));
    }))        
    .subscribe((cc: any) => {
        this.CCs = cc;
        //console.log(this.CCs, "yooo")
    });
    });
  }

signOut(): void {
    this.authService.signOut();
  }



cancel(id: number){
  this.previousOrdersService.cancelOrder(id).subscribe();
  this.getCombined()
}



}
