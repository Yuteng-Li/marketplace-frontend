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

}