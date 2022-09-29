import { Component,  OnInit ,OnDestroy} from '@angular/core';
import { CartService } from './cart.component.service';
import { ShoppingCart } from './cart.component.shopcartmodel';



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
  totalTax:number = 0;
  subscription:any;
  tempDiffArray!:Array<number>;
  removeQtyArray!:Array<number>;
  removePriceArray!:Array<number>;
  totalTaxArray!:Array<number>;
  taxRate:number=0.1;
  diffInTaxBefore!:Array<number>; 
  diffInTaxAfter!:Array<number>; 
  // diffTaxTempArray!:Array<number>;
  diffTax:number = 0;
  totalPrice:number = 0;

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

  populateTotalTaxArray(shoppingCartArray:Array<ShoppingCart>){
    for (let i=0;i<shoppingCartArray.length;i++){
      this.totalTaxArray[i]=shoppingCartArray[i].itemQty*shoppingCartArray[i].itemPrice*this.taxRate;
    }
    return this.totalTaxArray;
  }

  handleChange(index:number){
      if (this.shoppingCartArray[index].itemQty<1){
        this.shoppingCartArray[index].itemQty=1;
      }
      if (this.shoppingCartArray[index].itemQty>100){
        this.shoppingCartArray[index].itemQty=100;
      }

      this.diff = this.shoppingCartArray[index].itemQty-this.tempDiffArray[index];
      this.diffInTaxBefore[index]=this.totalTaxArray[index];
      // also handle subtotal
      // rewrite cartsubtotal using itemQty*itemPrice
      // two cases, when increase qty and decrease qty
      // case 1: increase qty
      if(this.diff>0){  
        this.removePriceArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removeQtyArray[index]+=(this.diff);
        this.totalTaxArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice*this.taxRate);
        this.diffInTaxAfter[index]=this.totalTaxArray[index];
      }
      //case 2:decrease qty
      else{
        //then we subtract itemprice from subtotal
        //i use += because the diff is negative when dec qty
        //  - - = +
        this.removePriceArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.removeQtyArray[index]+=(this.diff);
        this.totalTaxArray[index]+=(this.diff*this.shoppingCartArray[index].itemPrice)*this.taxRate;
        this.diffInTaxAfter[index]=this.totalTaxArray[index];
      }
        this.diffTax=this.diffInTaxAfter[index]-this.diffInTaxBefore[index];
        this.cartSubtotal+=(this.diff*this.shoppingCartArray[index].itemPrice);
        this.tempDiffArray[index] = this.shoppingCartArray[index].itemQty;
        this.numItems+=this.diff;
        this.totalTax+=this.diffTax;
        this.totalPrice=this.cartSubtotal+this.totalTax;
  }
  
  handleRemove(index:number){
    //handle the change in total number and sum amount
    //subtract the removeQty and removePrice off the numItems, and cartSubtotal
    //fix this lolololol
    this.numItems-=this.removeQtyArray[index];
    this.cartSubtotal-=this.removePriceArray[index];
    this.totalTax-=this.totalTaxArray[index];
    this.totalPrice=this.totalPrice-this.removePriceArray[index]-this.totalTaxArray[index];
     //assign some dummy variable after remove
     this.shoppingCartArray[index]={
      itemDesc:"",
      itemImgUrl:"",
      itemName:"",
      itemPrice:0,
      itemQty:0,
      itemUpc:""
     } as ShoppingCart ;
     this.removePriceArray[index]=0;
     this.removeQtyArray[index]=0;
     this.totalTaxArray[index]=0;
     this.diffInTaxBefore[index]=0;
     this.diffInTaxAfter[index]=0;
  }


  ngOnInit() {

    this.tempDiffArray=new Array(this.shoppingCartArray.length).fill(0);
    this.popluateDiffQty(this.shoppingCartArray);
    

    this.removePriceArray=new Array(this.shoppingCartArray.length).fill(0);
    this.popluateRemovePrice(this.shoppingCartArray);
    
    this.removeQtyArray=new Array(this.shoppingCartArray.length).fill(0);
    this.populateRemoveQty(this.shoppingCartArray);

    this.totalTaxArray=new Array(this.shoppingCartArray.length).fill(0);
    this.populateTotalTaxArray(this.shoppingCartArray);
    
    this.diffInTaxBefore=new Array(this.shoppingCartArray.length).fill(0);
    this.diffInTaxAfter=new Array(this.shoppingCartArray.length).fill(0);
    // this.diffTaxTempArray=new Array(this.shoppingCartArray.length).fill(0);

    //initialize cartsubtotal
    this.shoppingCartArray.forEach(item => { 
      this.cartSubtotal += (item.itemPrice * item.itemQty)
    });
    //initialize numItems
    this.shoppingCartArray.forEach(
      item => {
          this.numItems += item.itemQty
    });
    //initialize totaltax
    this.shoppingCartArray.forEach(
      item => {
          this.totalTax += (item.itemPrice * item.itemQty)*this.taxRate;
    });

    this.totalPrice= this.cartSubtotal+this.totalTax;

}

ngOnDestroy(): void {
  //  this.cartservice.shoppingCartArray=[] as any;
  this.cartservice.existInCart=false;
}


}
