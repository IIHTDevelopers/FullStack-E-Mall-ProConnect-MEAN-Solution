const OrderServiceImpl = require('../../modules/order/service/impl/order.serviceImpl');
const Order = require('../../modules/order/dao/models/order.model');

jest.mock('../../modules/order/dao/models/order.model');

let orderServiceBoundaryTest = `OrderService functional test`;

describe('Order Service', () => {
    let orderService;

    beforeEach(() => {
        orderService = new OrderServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${orderServiceBoundaryTest} should create a new order`, async () => {
            const orderData = {
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };
            Order.create.mockResolvedValue(orderData);

            const result = await orderService.createOrder(orderData);
            expect(result).toEqual(orderData);
        });

        it(`${orderServiceBoundaryTest} should get order by ID`, async () => {
            const orderId = 'order_id';
            const order = { _id: orderId, user: 'user_id' };
            Order.findById.mockResolvedValue(order);

            const result = await orderService.getOrder(orderId);
            expect(result).toEqual(order);
        });

        it(`${orderServiceBoundaryTest} should update order by ID`, async () => {
            const orderId = 'order_id';
            const updatedOrderData = {
                user: 'updated_user_id',
                products: [
                    { product: 'updated_product_id_1', quantity: 3 },
                    { product: 'updated_product_id_2', quantity: 4 },
                ],
                totalAmount: 150.0,
            };
            const updatedOrder = { _id: orderId, ...updatedOrderData };
            Order.findByIdAndUpdate.mockResolvedValue(updatedOrder);

            const result = await orderService.updateOrder(orderId, updatedOrderData);
            expect(result).toEqual(updatedOrder);
        });

        it(`${orderServiceBoundaryTest} should delete order by ID`, async () => {
            const orderId = 'order_id';
            const deletedOrder = {
                _id: orderId,
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };
            Order.findByIdAndDelete.mockResolvedValue(deletedOrder);

            const result = await orderService.deleteOrder(orderId);
            expect(result).toEqual(deletedOrder);
        });

        it(`${orderServiceBoundaryTest} should throw an error when order is not found for getOrder`, async () => {
            const orderId = 'non_existing_id';
            Order.findById.mockResolvedValue(null);
            await expect(orderService.getOrder(orderId)).rejects.toThrow('Failed to get order.');
        });

        it(`${orderServiceBoundaryTest} should throw an error when order is not found for updateOrder`, async () => {
            const orderId = 'non_existing_id';
            const updatedOrderData = {
                user: 'updated_user_id',
                products: [
                    { product: 'updated_product_id_1', quantity: 3 },
                    { product: 'updated_product_id_2', quantity: 4 },
                ],
                totalAmount: 150.0,
            };
            Order.findByIdAndUpdate.mockResolvedValue(null);
            await expect(orderService.updateOrder(orderId, updatedOrderData)).rejects.toThrow('Failed to update order.');
        });

        it(`${orderServiceBoundaryTest} should throw an error when order is not found for deleteOrder`, async () => {
            const orderId = 'non_existing_id';
            Order.findByIdAndDelete.mockResolvedValue(null);
            await expect(orderService.deleteOrder(orderId)).rejects.toThrow('Failed to delete order.');
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to create an order`, async () => {
            const orderData = {
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };
            const error = new Error('Failed to create order.');
            Order.create.mockRejectedValue(error);
            await expect(orderService.createOrder(orderData)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to update an order by ID`, async () => {
            const orderId = 'non_existing_id';
            const updatedOrderData = {
                user: 'updated_user_id',
                products: [
                    { product: 'updated_product_id_1', quantity: 3 },
                    { product: 'updated_product_id_2', quantity: 4 },
                ],
                totalAmount: 150.0,
            };
            const error = new Error('Failed to update order.');
            Order.findByIdAndUpdate.mockRejectedValue(error);
            await expect(orderService.updateOrder(orderId, updatedOrderData)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to delete an order by ID`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to delete order.');
            Order.findByIdAndDelete.mockRejectedValue(error);
            await expect(orderService.deleteOrder(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should get user's orders`, async () => {
            const userId = 'user_id';
            const userOrders = [
                { _id: 'order_id_1', user: userId },
                { _id: 'order_id_2', user: userId },
            ];
            Order.find.mockResolvedValue(userOrders);

            const result = await orderService.getUserOrders(userId);
            expect(result).toEqual(userOrders);
        });

        it(`${orderServiceBoundaryTest} should cancel an order`, async () => {
            const orderId = 'order_id';
            const canceledOrder = { _id: orderId, user: 'user_id', status: 'Canceled' };
            Order.findByIdAndDelete.mockResolvedValue(canceledOrder);

            const result = await orderService.cancelOrder(orderId);
            expect(result).toEqual(canceledOrder);
        });

        it(`${orderServiceBoundaryTest} should retrieve payment details for an order`, async () => {
            const orderId = 'order_id';
            const paymentDetails = { status: 'Paid', transactionId: '1234567890' };
            const order = { _id: orderId, payment: paymentDetails };
            Order.findById.mockResolvedValue(order);

            const result = await orderService.retrievePaymentDetails(orderId);
            expect(result).toEqual(paymentDetails);
        });

        it(`${orderServiceBoundaryTest} should generate an invoice for an order`, async () => {
            const orderId = 'order_id';
            const order = { _id: orderId, createdAt: new Date(), totalAmount: 100.0 };
            Order.findById.mockResolvedValue(order);

            const result = await orderService.generateInvoice(orderId);
            expect(result.orderId).toBe(order._id);
            expect(result.orderDate).toBe(order.createdAt);
            expect(result.totalAmount).toBe(order.totalAmount);
        });

        it(`${orderServiceBoundaryTest} should track shipment details for an order`, async () => {
            const orderId = 'order_id';
            const shipmentDetails = { status: 'Shipped', trackingNumber: '1234567890' };
            const order = { _id: orderId };
            Order.findById.mockResolvedValue(order);

            const result = await orderService.trackShipment(orderId);
            expect(result).toEqual(shipmentDetails);
        });

        it(`${orderServiceBoundaryTest} should retrieve order analytics`, async () => {
            const orders = [
                { totalAmount: 100.0 },
                { totalAmount: 150.0 },
                { totalAmount: 80.0 },
            ];
            Order.find.mockResolvedValue(orders);

            const result = await orderService.getOrderAnalytics();
            expect(result.totalOrders).toBe(orders.length);
            expect(result.averageOrderAmount).toBeCloseTo((100.0 + 150.0 + 80.0) / 3, 2);
            expect(result.highestOrderAmount).toBe(150.0);
            expect(result.lowestOrderAmount).toBe(80.0);
        });

        it(`${orderServiceBoundaryTest} should retrieve revenue analytics`, async () => {
            const orders = [
                { totalAmount: 100.0 },
                { totalAmount: 150.0 },
                { totalAmount: 80.0 },
            ];
            Order.find.mockResolvedValue(orders);

            const result = await orderService.getRevenueAnalytics();
            expect(result.totalRevenue).toBeCloseTo(100.0 + 150.0 + 80.0, 2);
            expect(result.highestRevenue).toBe(150.0);
            expect(result.lowestRevenue).toBe(80.0);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to retrieve user's orders`, async () => {
            const userId = 'user_id';
            const error = new Error('Failed to retrieve user orders.');
            Order.find.mockRejectedValue(error);
            await expect(orderService.getUserOrders(userId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to cancel an order`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to cancel order.');
            Order.findByIdAndDelete.mockRejectedValue(error);
            await expect(orderService.cancelOrder(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to retrieve payment details`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to retrieve payment details.');
            Order.findById.mockRejectedValue(error);
            await expect(orderService.retrievePaymentDetails(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to process payment`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to process payment.');
            Order.findById.mockResolvedValue({ _id: orderId });
            Order.findByIdAndUpdate.mockRejectedValue(error);
            await expect(orderService.processPayment(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to generate an invoice`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to generate invoice.');
            Order.findById.mockRejectedValue(error);
            await expect(orderService.generateInvoice(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to track shipment details`, async () => {
            const orderId = 'non_existing_id';
            const error = new Error('Failed to track shipment.');
            Order.findById.mockRejectedValue(error);
            await expect(orderService.trackShipment(orderId)).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to retrieve order analytics`, async () => {
            const error = new Error('Failed to retrieve order analytics.');
            Order.find.mockRejectedValue(error);
            await expect(orderService.getOrderAnalytics()).rejects.toThrow(error);
        });

        it(`${orderServiceBoundaryTest} should throw an error when failing to retrieve revenue analytics`, async () => {
            const error = new Error('Failed to retrieve revenue analytics.');
            Order.find.mockRejectedValue(error);
            await expect(orderService.getRevenueAnalytics()).rejects.toThrow(error);
        });

    });
});
