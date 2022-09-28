export class Orders{
    OrderID: number = 0;
    UserID: number = 0;
    AddressID: number = 0;
    Price: number = 0.00;
    CreditCardID: number = 0;
    DateOrdered: Date = new Date(0);
    DateShipped: Date = new Date(0);
    DateDelivered: Date = new Date(0);
    OrderStatus: String = "";
}