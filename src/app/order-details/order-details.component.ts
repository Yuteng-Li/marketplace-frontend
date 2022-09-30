import { Product } from './../shared/Product';
import { PreviousOrdersService } from './../previous-orders/previous-orders.service';
import { ProductsService } from './products.service';
import { OrderDetailsService } from './order-details.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  test: any = [];
  orderData: any = [];
  prodInfo: any = [];
  myData: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  id: any;
  
  constructor(private router: Router,
    private route: ActivatedRoute, private authService: SocialAuthService, private orderDetails: OrderDetailsService,
    private productsService: ProductsService) { }
    user!: SocialUser;
    localUser =  localStorage.getItem('user');



  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log(this.id)

  });    

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

  
signOut(): void {
  this.authService.signOut();
}



  async getCombined() {
    console.log("getCombined")
    this.orderDetails.getOrderDetails(this.id).subscribe((orderData) => {
      this.myData.next(orderData)
      this.orderData = orderData;
      console.log(this.orderData, "orderItems")

      this.myData.pipe(switchMap(data => {
        return combineLatest(data.map((x: { upc: String; }) => 
        this.productsService.getProductsId(x.upc)
        
         ));
    }))        
    .subscribe((add: any) => {
        this.prodInfo = add;
        console.log(this.prodInfo, "products");
      });

    });
  }

}


