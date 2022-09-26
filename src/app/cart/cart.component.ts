import { Component,  OnInit ,OnDestroy} from '@angular/core';
import { CartService } from './cart.component.service';
import { ShoppingCart } from './cart.component.shopcartmodel';
import {map} from "rxjs";


import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit,OnDestroy {
  user!: SocialUser;
  constructor(private cartservice:CartService,private authService: SocialAuthService) {}

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
      this.removePriceArray[i]=shoppingCartArray[i].itemPrice*shoppingCartArray[i].itemQty;
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
      }
      //case 2:decrease qty
      else{
        //then we subtract itemprice from subtotal
        //i use += because the diff is negative when dec qty
        //  - - = +
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removePriceArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removeQtyArray[index]+=(this.diff);
      }
        this.tempDiffArray[index] = this.shoppingCartArray[index].itemQty;
        this.numItems+=this.diff;
  }
  
  handleRemove(index:number){
    //handle the change in total number and sum amount
    //subtract the removeQty and removePrice off the numItems, and cartSubtotal
    this.numItems-=this.removeQtyArray[index];
    this.cartSubtotal-=this.removePriceArray[index];
     //assign some dummy variable after remove
     this.shoppingCartArray[index]={} as ShoppingCart ;
     this.removePriceArray[index]=0;
     this.removeQtyArray[index]=0;
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
  this.cartservice.existInCart=false;
}


}
