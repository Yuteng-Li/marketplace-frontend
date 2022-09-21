import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-gird',
  templateUrl: './item-gird.component.html',
  styleUrls: ['./item-gird.component.css']
})
export class ItemGirdComponent implements OnInit {

  
  id: string;
  product: any;

  constructor(private ItemService:ItemService) { 
    this.id = "036000291452";
  }


  ngOnInit(): void {
    this.ItemService.getProductById(this.id).subscribe(product => {
      this.product = product;
    })
  }

 
}
