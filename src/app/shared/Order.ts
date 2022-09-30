export interface OrderItem{
    quantity: number,
    upc: string
}
export interface Order{
    price: number,
    userId: number,
    addressID: number,
    creditCardID: number,
    orderItems : OrderItem[]
}