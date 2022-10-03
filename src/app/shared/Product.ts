export interface Product{
    upc:string;
    prodName:string;
    imageURL:string;
    category:string;
    pricePerUnit:number;
    brand:string;
    prodDesc:string;
    //itemQty should be not greater than availStock
    availableStock:number;
    shippedStock:number;
    reservedStock:number;

}