export interface Item {
    upc: string;
    prodName: string;
    brand: string;
    prodDesc: string;
    category: string;
    pricePerUnit: number;
    imageURL: string;
    availableStock: number;
    reservedStock: number;
    shippedStock: number;
}