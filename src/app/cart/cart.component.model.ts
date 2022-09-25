export interface Product{
    upc:string;
    prod_name:string;
    image_url:string;
    category:string;
    price_per_unit:number;
    brand:string;
    prod_description:string;
    //itemQty should be not greater than availStock
    available_stock:number;
    shipped_stock:number;
    reserved_stock:number;

    // constructor(){}

    // public get _upc(){
    //     return this.upc;
    // }

    // public set _upc(theUpc:string){
    //     //maybe check if upc is 12 char long 
    //     this.upc = theUpc;
    // }

    // public get _ProdName(){
    //     return this.ProdName;
    // }

    // public set _ProdName(theProdName:string){
    //     this.ProdName=theProdName;
    // }

    // public get _imageURL(){
    //     return this.imageURL;
    // }

    // public set _imageURL (theImageURL:string){
    //     this.imageURL=theImageURL;
    // }
    // public get _category(){
    //     return this.category;
    // }

    // public set _catergory(theCategory:string){
    //     this.category=theCategory;
    // }
    // public get _pricePerUnit(){
    //     return this.pricePerUnit;
    // }

    // public set _PricePerUnit(thePrice:number){
    //     this.pricePerUnit=thePrice;
    // }
    // public get _brand(){
    //     return this.brand;
    // }

    // public set _brand(theBrand:string){
    //     this.brand= theBrand;
    // }
    // public get _prodDesc(){
    //     return this.prodDesc;
    // }

    // public set _prodDesc(theDesc:string){
    //     this.prodDesc=theDesc;
    // }
    // public get _availableStock(){
    //     return this.availableStock;
    // }

    // public set _availableStock(theAvilStock:number){
    //     this.availableStock=theAvilStock;
    // }
    // public get _shippedStock(){
    //     return this.shippedStock;
    // }

    // public set _shippedStock(theShipStock:number){
    //     this.shippedStock=theShipStock;
    // }
    // public get _reservedStock(){
    //     return this.reservedStock;
    // }

    // public set _reservedStock(theReservStock){
    //     this.reservedStock=theReservStock;
    // }
}