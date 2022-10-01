export interface OrderItem{
    quantity: number,
    upc: string
}
export interface Order{
    price: number,
    user_id: number,
    address_id: number,
    credit_card_id: number,
    orderItems : OrderItem[]
}

export interface BackEndCart{
    quantity:number,
    upc:string,
    user_id:number
}