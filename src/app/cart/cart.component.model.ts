<<<<<<< HEAD
export class ShopppingCart{
    upc:String="";
    ProdName:String="";
    imageURL:String="";
    category:String="";
    pricePerUnit:number = 0;
    brand:String="";
    prodDesc:String="";
    availableStock:number = 0;
    shippedStock:number =0;
    reservedStock:number = 0;
=======
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

>>>>>>> 2f37d89c9f5f1905e36e3c599c1945d79ebe6217
}