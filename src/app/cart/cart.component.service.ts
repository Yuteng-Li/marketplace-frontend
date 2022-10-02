import { Injectable } from "@angular/core";      
import { ShoppingCart } from "./cart.component.shopcartmodel";
import { Product } from "../shared/Product";

@Injectable({
    providedIn:"root"
})
export class CartService{

    shoppingCartArray:ShoppingCart[]=[];
    cartItem!:ShoppingCart;
    existInCart:boolean=false;
    tempIndex:number=0;
    addToCart(product:Product){
      //check if prodcut already in cart
      for (let i = 0;i<this.shoppingCartArray.length;++i){
        if (this.shoppingCartArray[i].itemName===product.prodName){
          this.tempIndex=i;
          this.existInCart=true;
          this.shoppingCartArray[i].itemQty+=1;
          alert("add to cart successfully")
          break;
        }
        else{
          this.existInCart=false;
        }
      }

      //if the product do not exist, add this into cart
      if(! this.existInCart){
        this.cartItem =<ShoppingCart>{
          itemName:product.prodName,
          itemPrice:product.pricePerUnit,
          itemUpc:product.upc,
          itemImgUrl:product.imageURL,
          itemDesc:product.prodDesc,
          itemQty:1
        };
        this.shoppingCartArray.push(this.cartItem);
        alert("add to cart successfully")
      }      
    }
    emptyCart(): void{
      this.shoppingCartArray = [];
    }

}