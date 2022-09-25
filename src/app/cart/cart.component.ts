import { Component,  OnInit ,OnDestroy} from '@angular/core';
import { CartService } from './cart.component.service';
import { ShoppingCart } from './cart.component.shopcartmodel';
import {map} from "rxjs";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  constructor(private cartservice:CartService) {}

  shoppingCartArray = new Array<ShoppingCart>();

  /*diff(difference) is used when determining if we increase qty 
  or decrease qty */
  diff:number=0;
  numItems:number=0;
  cartSubtotal:number=0;
  subscription:any;
  temp!:Array<number>;

 
  //this was used to keep track of the itemQty in the begining
  //Was used to compared with updated itemQty after ngModel
  //to determine if we increase or decrease the item
  popluateTemp(shoppingCartArray:Array<ShoppingCart>){
    for (let i=0;i<shoppingCartArray.length;i++){
      this.temp[i]=shoppingCartArray[i].itemQty;
    }
    return this.temp;
  }
  handleChange(index:number){
      this.diff = this.shoppingCartArray[index].itemQty-this.temp[index];
      // also handle subtotal
      // rewrite cartsubtotal using itemQty*itemPrice
      // two cases, when increase qty and decrease qty
      // case 1: increase qty
      if(this.shoppingCartArray[index].itemQty>this.temp[index]){  
        //then we add the itemprice into the subtotal
        //this is fine
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
      }
      //case 2:decrease qty
      else{
        //then we subtract itemprice from subtotal
        //i use += because the diff is negative when dec qty
        //  - - = +
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
      }
        this.temp[index] = this.shoppingCartArray[index].itemQty;
        this.numItems+=this.diff;
  }
  
  ngOnInit() {
    //  this.subscription=this.cartservice.getProdByUpc("100000000001")
    //  .pipe(map(ProdRes=><ShoppingCart>{
    //     itemName:ProdRes.product.prod_name,
    //     itemPrice:ProdRes.product.price_per_unit,
    //     itemUpc:ProdRes.product.upc,
    //     itemImgUrl:ProdRes.product.image_url,
    //     itemDesc:ProdRes.product.prod_description,
    //     itemQty:1
    //  }))
    // .subscribe(
    //   shopCart =>{ this.shoppingCartArray.push(shopCart)
    //     // this.temp=new Array(this.shoppingCartArray.length).fill(0);
    //     // this.popluateTemp(this.shoppingCartArray);
    //     // this.shoppingCartArray.forEach(item => { 
    //     //   this.cartSubtotal += (item.itemPrice * item.itemQty)
    //     // });
    //     // this.shoppingCartArray.forEach(
    //     //   item => {
    //     //     this.numItems += item.itemQty
    //     //   })
    //   }
    // );

    // this.subscription=this.cartservice.getProdByUpc("100000000011")
    //  .pipe(map(ProdRes=><ShoppingCart>{
    //     itemName:ProdRes.product.prod_name,
    //     itemPrice:ProdRes.product.price_per_unit,
    //     itemUpc:ProdRes.product.upc,
    //     itemImgUrl:ProdRes.product.image_url,
    //     itemDesc:ProdRes.product.prod_description,
    //     itemQty:1
    //  }))
    // .subscribe(
    //   shopCart => {this.shoppingCartArray.push(shopCart);
    //     this.temp=new Array(this.shoppingCartArray.length).fill(0);
    //     this.popluateTemp(this.shoppingCartArray);
    //     this.shoppingCartArray.forEach(item => { 
    //       this.cartSubtotal += (item.itemPrice * item.itemQty)
    //     });
    //     this.shoppingCartArray.forEach(
    //       item => {
    //         this.numItems += item.itemQty
    //       })
    //     }
    // );

    

}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
