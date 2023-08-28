const request = require('supertest');
const express = require('express');
const router = require('../../modules/order/routes/order.routes');

const OrderController = require('../../modules/order/controller/order.controller');
const OrderServiceImpl = require('../../modules/order/service/impl/order.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');
const adminMiddleware = require('../../modules/middleware/authAdminMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(adminMiddleware);
app.use(router);

jest.mock('../../modules/order/service/impl/order.serviceImpl');

let orderControllerBoundaryTest = `OrderController boundary test`;

describe('Order Controller', () => {
    describe('boundary', () => {
        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /all protected routes without a token`, async () => {
            const response = await request(app).get('/all');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access post /create protected routes without a token`, async () => {
            const response = await request(app).post('/create');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /:id protected routes without a token`, async () => {
            const response = await request(app).get('/1234');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id protected routes without a token`, async () => {
            const response = await request(app).delete('/1234');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /user/:userId protected routes without a token`, async () => {
            const response = await request(app).get('/user/1234');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /cancel/:id protected routes without a token`, async () => {
            const response = await request(app).delete('/cancel/1234');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /:id/payment protected routes without a token`, async () => {
            const response = await request(app).get('/1234/payment');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access post /:id/pay protected routes without a token`, async () => {
            const response = await request(app).post('/1234/pay');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /analytics protected routes without a token`, async () => {
            const response = await request(app).get('/analytics');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /:id/invoice protected routes without a token`, async () => {
            const response = await request(app).get('/1234/invoice');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /:id/shipment protected routes without a token`, async () => {
            const response = await request(app).get('/1234/shipment');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /revenue protected routes without a token`, async () => {
            const response = await request(app).get('/revenue');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should return 401 Unauthorized when trying to access get /ordered/:userId/:productId protected routes without a token`, async () => {
            const response = await request(app).get('/ordered/1234/5678');
            expect(response.status).toBe(401);
        });

        it(`${orderControllerBoundaryTest} should create a new order`, async () => {
            const mReq = {
                body: {
                    user: 'user_id',
                    products: [
                        { product: 'product_id_1', quantity: 2 },
                        { product: 'product_id_2', quantity: 3 },
                    ],
                    totalAmount: 100.0,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockOrder = {
                _id: 'mockOrderId',
                ...mReq.body,
            };

            OrderServiceImpl.prototype.createOrder.mockResolvedValueOnce(mockOrder);

            await new OrderController().createOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.createOrder).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockOrder);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should retrieve an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const mockOrder = {
                _id: orderId,
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.getOrder.mockResolvedValueOnce(mockOrder);

            await new OrderController().getOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.getOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(mockOrder);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should update an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const updatedOrderData = {
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 3 },
                    { product: 'product_id_2', quantity: 4 },
                ],
                totalAmount: 150.0,
            };
            const updatedOrder = {
                _id: orderId,
                ...updatedOrderData,
            };

            const mReq = {
                params: { id: orderId },
                body: updatedOrderData,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.updateOrder.mockResolvedValueOnce(updatedOrder);

            await new OrderController().updateOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.updateOrder).toHaveBeenCalledWith(orderId, updatedOrderData);
            expect(mRes.json).toHaveBeenCalledWith(updatedOrder);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should delete an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const deletedOrder = {
                _id: orderId,
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.deleteOrder.mockResolvedValueOnce(deletedOrder);

            await new OrderController().deleteOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.deleteOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(deletedOrder);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should return a 404 error when getting an order with invalid ID`, async () => {
            const orderId = 'invalidOrderId';

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.getOrder.mockRejectedValueOnce(new Error('Order not found.'));

            await new OrderController().getOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.getOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Order not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should return a 404 error when updating an order with invalid ID`, async () => {
            const orderId = 'invalidOrderId';
            const updatedOrderData = {
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 3 },
                    { product: 'product_id_2', quantity: 4 },
                ],
                totalAmount: 150.0,
            };

            const mReq = {
                params: { id: orderId },
                body: updatedOrderData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.updateOrder.mockRejectedValueOnce(new Error('Order not found.'));

            await new OrderController().updateOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.updateOrder).toHaveBeenCalledWith(orderId, updatedOrderData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Order not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should return a 404 error when deleting an order with invalid ID`, async () => {
            const orderId = 'invalidOrderId';

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.deleteOrder.mockRejectedValueOnce(new Error('Order not found.'));

            await new OrderController().deleteOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.deleteOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Order not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should return a 500 error when creating an order fails`, async () => {
            const mReq = {
                body: {
                    user: 'user_id',
                    products: [
                        { product: 'product_id_1', quantity: 2 },
                        { product: 'product_id_2', quantity: 3 },
                    ],
                    totalAmount: 100.0,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to create order.');
            OrderServiceImpl.prototype.createOrder.mockRejectedValueOnce(error);

            await new OrderController().createOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.createOrder).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create order.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should return a 404 error when deleting an order with invalid ID`, async () => {
            const orderId = 'invalidOrderId';

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Order not found.');
            OrderServiceImpl.prototype.deleteOrder.mockRejectedValueOnce(error);

            await new OrderController().deleteOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.deleteOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Order not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should retrieve user's orders by user ID`, async () => {
            const userId = 'mockUserId';
            const mockUserOrders = [
                { _id: 'order_id_1', user: userId, totalAmount: 100.0 },
                { _id: 'order_id_2', user: userId, totalAmount: 150.0 },
            ];

            const mReq = {
                params: { userId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.getUserOrders.mockResolvedValueOnce(mockUserOrders);

            await new OrderController().getUserOrders(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.getUserOrders).toHaveBeenCalledWith(userId);
            expect(mRes.json).toHaveBeenCalledWith(mockUserOrders);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should cancel an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const canceledOrder = {
                _id: orderId,
                user: 'user_id',
                products: [
                    { product: 'product_id_1', quantity: 2 },
                    { product: 'product_id_2', quantity: 3 },
                ],
                totalAmount: 100.0,
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.cancelOrder.mockResolvedValueOnce(canceledOrder);

            await new OrderController().cancelOrder(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.cancelOrder).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(canceledOrder);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should retrieve payment details for an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const paymentDetails = {
                status: 'Paid',
                transactionId: '1234567890',
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.retrievePaymentDetails.mockResolvedValueOnce(paymentDetails);

            await new OrderController().getPaymentDetails(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.retrievePaymentDetails).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(paymentDetails);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should process payment for an order by ID`, async () => {
            const orderId = 'mockOrderId';

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new OrderController().processPayment(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.processPayment).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith({ message: 'Payment processed successfully.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should retrieve order analytics`, async () => {
            const orderAnalytics = {
                totalOrders: 10,
                averageOrderAmount: 120.0,
                highestOrderAmount: 200.0,
                lowestOrderAmount: 80.0,
            };

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.getOrderAnalytics.mockResolvedValueOnce(orderAnalytics);

            await new OrderController().getOrderAnalytics(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.getOrderAnalytics).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(orderAnalytics);
            expect(mNext).not.toHaveBeenCalled();
        });


        it(`${orderControllerBoundaryTest} should generate an invoice for an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const invoice = {
                orderId: orderId,
                orderDate: new Date(),
                totalAmount: 100.0,
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.generateInvoice.mockResolvedValueOnce(invoice);

            await new OrderController().generateInvoice(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.generateInvoice).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(invoice);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should track shipment for an order by ID`, async () => {
            const orderId = 'mockOrderId';
            const shipmentDetails = {
                status: 'Shipped',
                trackingNumber: '1234567890',
            };

            const mReq = {
                params: { id: orderId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.trackShipment.mockResolvedValueOnce(shipmentDetails);

            await new OrderController().trackShipment(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.trackShipment).toHaveBeenCalledWith(orderId);
            expect(mRes.json).toHaveBeenCalledWith(shipmentDetails);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${orderControllerBoundaryTest} should retrieve revenue analytics`, async () => {
            const revenueAnalytics = {
                totalRevenue: 5000.0,
                highestRevenue: 2000.0,
                lowestRevenue: 1000.0,
            };

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            OrderServiceImpl.prototype.getRevenueAnalytics.mockResolvedValueOnce(revenueAnalytics);

            await new OrderController().getRevenueAnalytics(mReq, mRes, mNext);

            expect(OrderServiceImpl.prototype.getRevenueAnalytics).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(revenueAnalytics);
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
