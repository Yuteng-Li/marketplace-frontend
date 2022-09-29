import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/Product';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'homepage-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  data: any;
  product: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string = '';
  sub!: Subscription
  searchedItem: Product[] = [];

  constructor(private itemService: ItemService, private router: Router) { }

  private _filteredString: string = '';
  get filteredString(): string {
    return this._filteredString;
  }
  set filteredString(value: string) {
    this._filteredString = value;
    console.log('In setter: ', value)
    this.filteredProducts = this.performFilter(value);
  }

  // Method will filter our list of items to only those with a item name that includes the list filter string
  // If it is empty it will return all items 

  // Filter through the chars set in the search bar 
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.product.filter((products: Product) =>
      products.prod_name.toLocaleLowerCase().includes(filterBy) ||
      products.prod_description.toLocaleLowerCase().includes(filterBy) ||
      products.brand.toLocaleLowerCase().includes(filterBy) ||
      products.category.toLocaleLowerCase().includes(filterBy));
  }

  // Need to create a lifecycle hook to call to perform component initialization
  ngOnInit(): void {
    this.sub = this.itemService.getItems().subscribe({
      next: product => {
        this.product = product;
        this.filteredProducts = this.product;

      },
      error: err => this.errorMessage = err
    });

  }

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ' + value);
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Need this method to route the button to the item grid page
  onClick(): void {
    console.log('The search icon was clicked')

  }

  goToSearchedItem(category: string) {
    console.log("display the category: " + category);
    //have to send a itemGridProduct array to itemgrid, and
    //set itemgrid array product to itemGridCatprod
    this.itemService.getProduct()
      .subscribe(productList => {
        this.searchedItem = productList.filter(products => products.prod_description.toLocaleLowerCase().includes(this._filteredString));
        console.log('----', + this.searchedItem)
        console.log('>>>' + this.product.forEach(element => console.log(element.prod_name)));
        this.itemService.itemGridCatProduct = this.searchedItem;
        // console.log('This.searchedItem is: ' + this.itemService.searchedItem);
        console.log("the array in service: " + this.itemService.itemGridCatProduct.forEach(element => console.log(element.prod_name)));
        if (this.itemService.itemGridCatProduct.length > 0) { this.router.navigate(['/item-gird']); }
        else { alert("No items match category") }

      })
  }


  // getItemsSearch(name: any){
  //   const keyword = name.target.value;
  //   const search = this.ItemService.getSearchProductName().then(response => {
  //     this.data = response;
  //     response
  //     console.log(this.data)
  //   })
  // }

}
