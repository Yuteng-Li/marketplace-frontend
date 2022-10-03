import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shared/Product';
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
  itemGridCatProduct: Product[] = [];

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

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.product.filter((products: Product) =>
      products.prodName.toLocaleLowerCase().includes(filterBy) ||
      products.prodDesc.toLocaleLowerCase().includes(filterBy) ||
      products.brand.toLocaleLowerCase().includes(filterBy) ||
      products.category.toLocaleLowerCase().includes(filterBy));
  }

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

  goToSearchedItem() {
    this.itemService.getProduct()
      .subscribe(productList => {
        this.itemGridCatProduct = productList.filter(products =>
          products.prodDesc.toLocaleLowerCase().includes(this.listFilter) ||
          products.prodName.toLocaleLowerCase().includes(this.listFilter) ||
          products.brand.toLocaleLowerCase().includes(this.listFilter) ||
          products.category.toLocaleLowerCase().includes(this.listFilter)
        );
        this.itemService.itemGridCatProduct = this.itemGridCatProduct;
        if (this.itemService.itemGridCatProduct.length > 0) { this.router.navigate(['/item-gird']); }
        else { alert("No items found") }
      })

  }

}
