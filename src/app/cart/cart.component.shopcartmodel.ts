export class ShoppingCart{
   itemUpc:String="";
   itemName:String="";
   itemPrice:number=0;
   itemImgUrl:String="";
   itemDesc:String="";
   
   public get _itemUpc(){
    return this.itemUpc;
   }

   public set _itemUpc(theItemUpc:String){
    this.itemUpc=theItemUpc;
   }

   public get _itemName(){
    return this.itemName;
   }

   public set _itemName(theItemName:String){
    this.itemName= theItemName;
   }

   public get _itemPrice(){
    return this.itemPrice;
   }

   public set _itemPrice(theItemPrice:number){
    this.itemPrice=theItemPrice;
   }

   public get _itemImgUrl(){
    return this.itemImgUrl;
   } 

   public set _itemImgUrl(theItemImgUrl:String){
    this.itemImgUrl=theItemImgUrl;
   }

   public get _itemDesc(){
    return this.itemDesc;
   }

   public set _itemDesc(theItemDesc){
    this.itemDesc=theItemDesc;
   }

}