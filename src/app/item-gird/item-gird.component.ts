import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-item-gird',
  templateUrl: './item-gird.component.html',
  styleUrls: ['./item-gird.component.css']
})
export class ItemGirdComponent implements OnInit {



  product : Item[] = [];

  constructor(private ItemService:ItemService) { 

  }


  ngOnInit(): void {
    //These API calls are temporary as the DBs are still changing so these will
    //eventually be changed but right now if you use the inventory db it should work until they change it
    this.DisplayAll();
    console.log('>>> in onInit')
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


 
}