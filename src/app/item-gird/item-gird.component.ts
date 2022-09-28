import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../cart/cart.component.model';
import { CartService } from '../cart/cart.component.service';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-gird',
  templateUrl: './item-gird.component.html',
  styleUrls: ['./item-gird.component.css']
})
export class ItemGirdComponent implements OnInit {

  product : Product[] = [];
  savedProduct : Product[] = [];
  Filters: String[]=[];
  user!: SocialUser;
  setMinPrice = 0.00;
  setMaxPrice = 250.00;
  searchProduct: Product[] = [];
  sub!: Subscription
  errorMessage: string = '';

  private _listFilter: string ='';
  get listFilter(): string{
      return this._listFilter;
  }
  set listFilter(value: string){
      this._listFilter = value;
      console.log('In setter: ' + value);
      this.searchProduct = this.performFilter(value);
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.product.filter((products: Product) => 
    products.prod_name.toLocaleLowerCase().includes(filterBy));
  }

  savedProducCategories!: string[];


  constructor(private ItemService:ItemService, private authService: SocialAuthService, private route: ActivatedRoute,
    private router: Router, public cartService:CartService) { 
  }

  
  

  ngOnInit(): void {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.DisplayAll();

    console.log(this.savedProducCategories)
    this.sub = this.ItemService.getItems().subscribe({
      next: product => {
        this.product = product;
        this.searchProduct = this.product;
      },
      error: err => this.errorMessage = err
    })
    console.log('>>> in onInit')
    //this.getByQuery();
    
  }

  displayByID(id:string){
      this.ItemService.getProductById(id).subscribe(product => {
        this.product.push(product.product);
      })
  }

  DisplayAll(){
    this.ItemService.getProduct().subscribe(product => {
      this.product=product;
      this.savedProduct=product;
      this.gatherCategories(this.product);
    })

  }

  gatherCategories(product:any[]){
    this.savedProducCategories = [...new Set(product.map(item => item.category))]
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

  addToFilter(event:any,Category:string){
    if(event.target.checked)
    {
      this.Filters.push(Category);
    }else
    {
      this.Filters = this.Filters.filter(values => values !== Category)
    }
  }

  setMin(minPrice:number){
    if(minPrice < 0 || isNaN(minPrice))
    {
      this.setMinPrice = 0.00;
    }else{
      this.setMinPrice = minPrice;
    }
  }

  setMax(maxPrice:number){
    if(maxPrice <= 0 || isNaN(maxPrice))
    {
      this.setMaxPrice= 250.00
    }else{
      this.setMaxPrice = maxPrice;
    }
  }


  filterBy()
  {
    if(this.Filters.length==0 )
    {
      this.product=this.savedProduct;
    }
    else{
      this.product= this.savedProduct.filter((obj)=> {
        return this.Filters.includes(obj.category);
      })
    }

    this.product= this.product.filter((obj)=> {
      return (obj.price_per_unit < this.setMaxPrice && obj.price_per_unit > this.setMinPrice);
    })
  }

}