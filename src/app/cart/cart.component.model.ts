export class Product{
    upc:String="";
    ProdName:String="";
    imageURL:String="";
    category:String="";
    pricePerUnit:number = 0;
    brand:String="";
    prodDesc:String="";
    //itemQty should be not greater than availStock
    availableStock:number = 0;
    shippedStock:number =0;
    reservedStock:number = 0;

    public get _upc(){
        return this.upc;
    }

    public set _upc(theUpc:String){
        //maybe check if upc is 12 char long 
        this.upc = theUpc;
    }

    public get _ProdName(){
        return this.ProdName;
    }

    public set _ProdName(theProdName:String){
        this.ProdName=theProdName;
    }

    public get _imageURL(){
        return this.imageURL;
    }

    public set _imageURL (theImageURL:String){
        this.imageURL=theImageURL;
    }
    public get _category(){
        return this.category;
    }

    public set _catergory(theCategory:String){
        this.category=theCategory;
    }
    public get _pricePerUnit(){
        return this.pricePerUnit;
    }

    public set _PricePerUnit(thePrice:number){
        this.pricePerUnit=thePrice;
    }
    public get _brand(){
        return this.brand;
    }

    public set _brand(theBrand:String){
        this.brand= theBrand;
    }
    public get _prodDesc(){
        return this.prodDesc;
    }

    public set _prodDesc(theDesc:String){
        this.prodDesc=theDesc;
    }
    public get _availableStock(){
        return this.availableStock;
    }

    public set _availableStock(theAvilStock:number){
        this.availableStock=theAvilStock;
    }
    public get _shippedStock(){
        return this.shippedStock;
    }

    public set _shippedStock(theShipStock:number){
        this.shippedStock=theShipStock;
    }
    public get _reservedStock(){
        return this.reservedStock;
    }

    public set _reservedStock(theReservStock){
        this.reservedStock=theReservStock;
    }
}