import { Component, OnInit, Pipe } from '@angular/core';
import { ItemService } from '../item.service';


@Component({
  selector: 'homepage-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  data: any;
  constructor(private itemService: ItemService) { }

  getItemsSearch(name: any){
    const keyword = name.target.value;
    const search = this.itemService.getSearchProductName().then(response => {
      this.data = response;
      response
      console.log(this.data)
    })
  }

  ngOnInit(): void {
  }

}
