import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/Product';
import { CartService } from '../cart/cart.component.service';
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
  Filters: String[]=[];
  user!: SocialUser;
  localUser =  localStorage.getItem('user');
  setMinPrice = 0.00;
  setMaxPrice = 250.00;
  searchProduct: Product[] = [];
  sub!: Subscription
  errorMessage: string = '';
  itemGridCartProdcut = this.ItemService.itemGridCatProduct;

  private _listFilter: string ='';
  get listFilter(): string{
      return this._listFilter;
  }
  set listFilter(value: string){
      this._listFilter = value;
      console.log('In setter: ' + value);
      this.filterBy();
      this.searchProduct = this.performFilter(value);
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.searchProduct.filter((products: Product) => 
    products.prod_name.toLocaleLowerCase().includes(filterBy) ||
    products.prod_description.toLocaleLowerCase().includes(filterBy) || 
    products.brand.toLocaleLowerCase().includes(filterBy) || 
    products.category.toLocaleLowerCase().includes(filterBy));
  }

  savedProducCategories!: string[];


  constructor(private ItemService:ItemService, private authService: SocialAuthService, private route: ActivatedRoute,
    private router: Router, public cartService:CartService) { 
  }

  
  

  ngOnInit() {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    this.authService.authState.subscribe((user) => {
      if(user==null && this.localUser !=null)
      {
        this.user = JSON.parse(this.localUser);
      }else
      {
        this.user=user;
      }
    });

    console.log("dat length: "+this.itemGridCartProdcut.length);
    if(this.itemGridCartProdcut.length>0){
      console.log("item filter work and length >0");
      this.product=this.itemGridCartProdcut;
      this.searchProduct=this.product;
      this.gatherCategories(this.product);
    }
    else{ this.DisplayAll();}
  
  }

  unDoneCatergoryArray(){
    this.itemGridCartProdcut=[];
    this.DisplayAll();
  }

  displayByID(id:string){
      this.ItemService.getProductById(id).subscribe(product => {
        this.product.push(product.product);
      })
  }

  DisplayAll(){
    //maybe have to check if product already have stuff in there
    // do like a if (product.length>0) check. so we do not 
    //overwrite the fitler product already
    this.ItemService.getItems().subscribe(product => {
      this.product=product;
      this.searchProduct = this.product;
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
      this.searchProduct=this.product;
    }
    else{
      this.searchProduct= this.product.filter((obj)=> {
        return this.Filters.includes(obj.category);
      })
    }

    this.searchProduct= this.searchProduct.filter((obj)=> {
      return (obj.price_per_unit < this.setMaxPrice && obj.price_per_unit > this.setMinPrice);
    })

    this.searchProduct = this.performFilter(this._listFilter)
  }
  
}