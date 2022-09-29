import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/Product';
import { Item } from '../item';
import { ItemService } from '../item.service';


@Component({
  selector: 'homepage-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  data: any;
  // items: Item[] = [];
  product: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string = '';
  sub!: Subscription

  // Injecting the Item Service
  constructor(private ItemService: ItemService) { }

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
    products.prod_name.toLocaleLowerCase().includes(filterBy));
  }

  // Need to create a lifecycle hook to call to perform component initialization
  ngOnInit(): void {
    this.sub = this.ItemService.getItems().subscribe({
      next: product => {
        this.product = product;
        this.filteredProducts = this.product;

      },
      error: err => this.errorMessage = err
    });
    
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  // Need this method to route the button to the item grid page
  onClick(): void {
    console.log('The search icon was clicked')

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
