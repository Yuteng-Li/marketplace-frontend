import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from '../item';
import { ItemService } from '../item.service';


@Component({
  selector: 'homepage-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  data: any;
  items: Item[] = [];
  filteredItems: Item[] = [];
  errorMessage: string = '';
  sub!: Subscription

  // Injecting the Item Service
  constructor(private itemService: ItemService) { }

  private _filteredString: string = '';
  get filteredString(): string {
    return this._filteredString;
  }
  set filteredString(value: string) {
    this._filteredString = value;
    console.log('In setter: ', value)
    this.filteredItems = this.performFilter(value);
  }

  //Method will filter our list of items to only those with a item name that includes the list filter string
  // If it is empty it will return all items 
  performFilter(filterBy: string): Item[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.items.filter((item: Item) =>
      item.prodName.toLowerCase().includes(filterBy));
  }

  // Need to create a lifecycle hook to call to perform component initialization
  ngOnInit(): void {
    this.sub = this.itemService.getItems().subscribe({
      next: items => {
        this.items = items;
        this.filteredItems = this.items;
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
  //   const search = this.itemService.getSearchProductName().then(response => {
  //     this.data = response;
  //     response
  //     console.log(this.data)
  //   })
  // }

}
