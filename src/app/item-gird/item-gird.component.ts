import { Component, OnInit, Input } from '@angular/core';
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



  product : any[] = [];
  user!: SocialUser;


  constructor(private ItemService:ItemService, private authService: SocialAuthService, private route: ActivatedRoute,
    private router: Router) { 
  }


  ngOnInit(): void {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.DisplayAll();
    this.getByQuery();
  }

  signOut(): void {
    this.authService.signOut();
  }

  displayByID(id:string){
      this.ItemService.getProductById(id).subscribe(product => {
        this.product.push(product.product);
        console.log(product);
      })
  }

  DisplayAll(){
    this.ItemService.getProduct().subscribe(product => {
      this.product=product;
      console.log(product);
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