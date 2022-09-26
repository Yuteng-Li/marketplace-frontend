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
  // shoppingCartArray = new Array<ShoppingCart>();
  shoppingCartArray = this.cartservice.shoppingCartArray;

  /*diff(difference) is used when determining if we increase qty 
  or decrease qty */
  diff:number=0;
  numItems:number=0;
  cartSubtotal:number=0;
  subscription:any;
  tempDiffArray!:Array<number>;
  removeQtyArray!:Array<number>;
  removePriceArray!:Array<number>;
  // removeQty:number =0;
  // removePrice:number = 0;
 
  //this was used to keep track of the itemQty in the begining
  //Was used to compared with updated itemQty after ngModel
  //to determine if we increase or decrease the item
  popluateDiffQty(shoppingCartArray:Array<ShoppingCart>){
    for (let i=0;i<shoppingCartArray.length;i++){
      this.tempDiffArray[i]=shoppingCartArray[i].itemQty;
    }
    return this.tempDiffArray;
  }
  popluateRemovePrice(shoppingCartArray:Array<ShoppingCart>){
    for (let i=0;i<shoppingCartArray.length;i++){
      this.removePriceArray[i]=shoppingCartArray[i].itemPrice;
    }
    return this.removePriceArray;
  }

  populateRemoveQty(shoppingCartArray:Array<ShoppingCart>){
    for (let i=0;i<shoppingCartArray.length;i++){
      this.removeQtyArray[i]=shoppingCartArray[i].itemQty;
    }
    return this.removeQtyArray;
  }

  handleChange(index:number){
      this.diff = this.shoppingCartArray[index].itemQty-this.tempDiffArray[index];
      // this.removePriceArray=new Array(this.shoppingCartArray.length).fill(0);
      // this.popluateRemovePrice(this.shoppingCartArray);
      // this.removeQtyArray=new Array(this.shoppingCartArray.length).fill(0);
      // this.populateRemoveQty(this.shoppingCartArray);

      console.log("================================");
      console.log("removePrice: "+this.removePriceArray);
      console.log("================================");
      console.log("removeQty: "+this.removeQtyArray);
      console.log("================================");
      console.log("tempDiff: "+this.tempDiffArray);
      console.log("itemQty at index: " + this.shoppingCartArray[index].itemQty);
      // also handle subtotal
      // rewrite cartsubtotal using itemQty*itemPrice
      // two cases, when increase qty and decrease qty
      // case 1: increase qty
      if(this.shoppingCartArray[index].itemQty>this.tempDiffArray[index]){  
        //then we add the itemprice into the subtotal
        //this is fine
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removePriceArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removeQtyArray[index]+=(this.diff);
        console.log("removePrice after +change: "+this.removePriceArray);
        console.log("carSubtotal after +change: "+this.cartSubtotal);
        console.log("removeQty after +change: "+this.removeQtyArray);
      }
      //case 2:decrease qty
      else{
        //then we subtract itemprice from subtotal
        //i use += because the diff is negative when dec qty
        //  - - = +
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removePriceArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removeQtyArray[index]+=(this.diff);
        console.log("removePrice after -change: "+this.removePriceArray);
        console.log("carSubtotal after -change: "+this.cartSubtotal);
        console.log("removeQty after -change: "+this.removeQtyArray);
      }
        this.tempDiffArray[index] = this.shoppingCartArray[index].itemQty;
        this.numItems+=this.diff;
        console.log("tempDiffArray after any change: "+ this.tempDiffArray);
        console.log("numItems after any change: "+ this.numItems);
  }
  
  handleRemove(index:number){
    //handle the change in total number and sum amount
    //first take out the itmQty and itemPrice
    // this.removePriceArray[index]=this.shoppingCartArray[index].itemPrice;
    // this.removeQtyArray[index]=this.shoppingCartArray[index].itemQty;
    //subtract the removeQty and removePrice off the numItems, and cartSubtotal
    this.numItems-=this.removeQtyArray[index];
    this.cartSubtotal-=this.removePriceArray[index];
    console.log("numItems after remove: " + this.numItems);
    console.log("cartsubtotal after remove: "+this.cartSubtotal);
     //assign some dummy variable after remove
     this.shoppingCartArray[index]={} as ShoppingCart ;
     this.removePriceArray[index]=0;
     this.removeQtyArray[index]=0;
     console.log("shoppingcartArray after remove: "+ this.shoppingCartArray.forEach(element => {
      console.log(element)
     }));
     console.log("removePriceArray after remove: "+this.removePriceArray);
     console.log("removeQtyArray after remove: "+this.removeQtyArray);
  }


  ngOnInit() {

    this.tempDiffArray=new Array(this.shoppingCartArray.length).fill(0);
    this.popluateDiffQty(this.shoppingCartArray);
    
    this.removePriceArray=new Array(this.shoppingCartArray.length).fill(0);
    this.popluateRemovePrice(this.shoppingCartArray);
    
    this.removeQtyArray=new Array(this.shoppingCartArray.length).fill(0);
    this.populateRemoveQty(this.shoppingCartArray);
    
         this.shoppingCartArray.forEach(item => { 
          this.cartSubtotal += (item.itemPrice * item.itemQty)
        });
        this.shoppingCartArray.forEach(
          item => {
            this.numItems += item.itemQty
          })
}

ngOnDestroy(): void {
  this.cartservice.shoppingCartArray=[] as any;
}


}
