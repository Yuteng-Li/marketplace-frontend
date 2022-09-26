function today(){return(new Date())} 
function yesterday(){return new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)}
function dayBeforeYesterday(){return new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 2)}
function today2(){return new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)}
function yesterday2(){return new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 2)}
function dayBeforeYesterday2(){return new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 3)}

export const PREVIOUSORDERS = [
    {
        OrderID: 1,
        UserID: 1,
        AddressID: 1,
        Price: 4.99,
        CreditCardID: 1,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Delivered',
      },
      {
        OrderID: 2,
        UserID: 2,
        AddressID: 2,
        Price: 3.99,
        CreditCardID: 2,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'In Progress',
      },
      {
        OrderID: 3,
        UserID: 3,
        AddressID: 3,
        Price: 5.99,
        CreditCardID: 3,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Out For Delivery',
      },
      {
        OrderID: 4,
        UserID: 4,
        AddressID: 4,
        Price: 8.99,
        CreditCardID: 4,
        DateOrdered: new Date(),
        DateShipped: '',
        DateDelivered: '',
        OrderStatus: 'Not Shipped Yet',
      },
      {
        OrderID: 1,
        UserID: 1,
        AddressID: 1,
        Price: 4.99,
        CreditCardID: 1,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Delivered',
      },
      {
        OrderID: 2,
        UserID: 2,
        AddressID: 2,
        Price: 3.99,
        CreditCardID: 2,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'In Progress',
      },
      {
        OrderID: 3,
        UserID: 3,
        AddressID: 3,
        Price: 5.99,
        CreditCardID: 3,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Out For Delivery',
      },
      {
        OrderID: 4,
        UserID: 4,
        AddressID: 4,
        Price: 8.99,
        CreditCardID: 4,
        DateOrdered: dayBeforeYesterday2(),
        DateShipped: new Date(0),
        DateDelivered: new Date(0),
        OrderStatus: 'Not Shipped Yet',
      },
      {
        OrderID: 1,
        UserID: 1,
        AddressID: 1,
        Price: 4.99,
        CreditCardID: 1,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Delivered',
      },
      {
        OrderID: 2,
        UserID: 2,
        AddressID: 2,
        Price: 3.99,
        CreditCardID: 2,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'In Progress',
      },
      {
        OrderID: 3,
        UserID: 3,
        AddressID: 3,
        Price: 5.99,
        CreditCardID: 3,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Out For Delivery',
      },
      {
        OrderID: 4,
        UserID: 4,
        AddressID: 4,
        Price: 8.99,
        CreditCardID: 4,
        DateOrdered: dayBeforeYesterday2(),
        DateShipped: new Date(0),
        DateDelivered: new Date(0),
        OrderStatus: 'Not Shipped Yet',
      },
      {
        OrderID: 1,
        UserID: 1,
        AddressID: 1,
        Price: 4.99,
        CreditCardID: 1,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Delivered',
      },
      {
        OrderID: 2,
        UserID: 2,
        AddressID: 2,
        Price: 3.99,
        CreditCardID: 2,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'In Progress',
      },
      {
        OrderID: 3,
        UserID: 3,
        AddressID: 3,
        Price: 5.99,
        CreditCardID: 3,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Out For Delivery',
      },
      {
        OrderID: 4,
        UserID: 4,
        AddressID: 4,
        Price: 8.99,
        CreditCardID: 4,
        DateOrdered: dayBeforeYesterday2(),
        DateShipped: new Date(0),
        DateDelivered: new Date(0),
        OrderStatus: 'Not Shipped Yet',
      },
      {
        OrderID: 1,
        UserID: 1,
        AddressID: 1,
        Price: 4.99,
        CreditCardID: 1,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Delivered',
      },
      {
        OrderID: 2,
        UserID: 2,
        AddressID: 2,
        Price: 3.99,
        CreditCardID: 2,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'In Progress',
      },
      {
        OrderID: 3,
        UserID: 3,
        AddressID: 3,
        Price: 5.99,
        CreditCardID: 3,
        DateOrdered: dayBeforeYesterday(),
        DateShipped: yesterday(),
        DateDelivered: today(),
        OrderStatus: 'Out For Delivery',
      },
      {
        OrderID: 4,
        UserID: 4,
        AddressID: 4,
        Price: 8.99,
        CreditCardID: 4,
        DateOrdered: dayBeforeYesterday2(),
        DateShipped: new Date(0),
        DateDelivered: new Date(0),
        OrderStatus: 'Not Shipped Yet',
    },
];