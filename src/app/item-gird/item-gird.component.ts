import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-item-gird',
  templateUrl: './item-gird.component.html',
  styleUrls: ['./item-gird.component.css']
})
export class ItemGirdComponent implements OnInit {



  product : any[] = [];

  constructor(private ItemService:ItemService) { 

  }


  ngOnInit(): void {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    //this.DisplayAll();
  }

  displayByID(){
    for (let i = 1; i < 4; i++) {
      this.ItemService.getProductById(i.toString()).subscribe(product => {
        this.product.push(product.product);
        console.log(product);
      })
    }
  }

  DisplayAll(){
    this.ItemService.getProduct().subscribe(product => {
      this.product=product;
      console.log(product);
    })
  }
 
}