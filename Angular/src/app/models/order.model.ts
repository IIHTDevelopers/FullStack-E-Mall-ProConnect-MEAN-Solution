export interface Order {
    _id?: string;
    user: string;
    products: OrderProduct[];
    status: 'Pending' | 'Shipped' | 'Delivered';
    totalAmount: number;
    paymentDetails: PaymentDetails;
    shipmentDetails: ShipmentDetails;
}

export interface OrderProduct {
    product: string;
    quantity: number;
}

export interface PaymentDetails {
    paymentMethod: string;
    transactionId: string;
    timestamp: Date;
}

export interface ShipmentDetails {
    address: string;
    trackingNumber: string;
    estimatedDelivery: Date;
}
