import { Component, OnInit, Input } from '@angular/core';
<<<<<<< HEAD
=======
import { Product } from '../cart/cart.component.model';
import { CartService } from '../cart/cart.component.service';
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-item-gird',
  templateUrl: './item-gird.component.html',
  styleUrls: ['./item-gird.component.css']
})
export class ItemGirdComponent implements OnInit {



<<<<<<< HEAD
  product : any[] = [];
  user!: SocialUser;


  constructor(private ItemService:ItemService, private authService: SocialAuthService, private route: ActivatedRoute,
    private router: Router) { 
  }

=======
  product : Product[] = [];
  user!: SocialUser;

  constructor(private ItemService:ItemService, private authService: SocialAuthService, private route: ActivatedRoute,
    private router: Router, public cartService:CartService) { 
  }

  
  
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217

  ngOnInit(): void {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.DisplayAll();
<<<<<<< HEAD
    this.getByQuery();
  }

  signOut(): void {
    this.authService.signOut();
=======
    //this.getByQuery();
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
  }

  displayByID(id:string){
      this.ItemService.getProductById(id).subscribe(product => {
        this.product.push(product.product);
<<<<<<< HEAD
        console.log(product);
=======
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
      })
  }

  DisplayAll(){
    this.ItemService.getProduct().subscribe(product => {
      this.product=product;
<<<<<<< HEAD
      console.log(product);
=======
>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
    })
  }

  getByQuery(){
    let queryParams = new HttpParams();

    this.route.queryParamMap
      .subscribe(paramMap => {
        paramMap.keys.forEach(key => {
          let value = paramMap.get(key);
          if(value != null)
          queryParams = queryParams.append(key,value)
        });
      }
    );

    this.ItemService.getProducts(queryParams).subscribe(product => {
      this.product=product;
    })
  }


 
}