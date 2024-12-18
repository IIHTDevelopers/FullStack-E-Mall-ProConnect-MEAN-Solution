const Order = require("../../dao/models/order.model");
const OrderService = require('../order.service');

class OrderServiceImpl extends OrderService {
    async createOrder(orderData) {
        try {
            const order = await Order.create(orderData);
            return order;
        } catch (error) {
            throw new Error('Failed to create order.');
        }
    }

    async getAllOrders() {
        try {
            const orders = await Order.find();
            return orders;
        } catch (error) {
            throw new Error('Failed to fetch all orders.');
        }
    }

    async getOrder(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found.');
            }
            return order;
        } catch (error) {
            throw new Error('Failed to get order.');
        }
    }

    async updateOrder(orderId, updatedOrder) {
        try {
            const order = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true });
            if (!order) {
                throw new Error('Order not found.');
            }
            return order;
        } catch (error) {
            throw new Error('Failed to update order.');
        }
    }

    async deleteOrder(orderId) {
        try {
            const order = await Order.findByIdAndDelete(orderId);
            if (!order) {
                throw new Error('Order not found.');
            }
            return order;
        } catch (error) {
            throw new Error('Failed to delete order.');
        }
    }

    async getUserOrders(userId) {
        try {
            const orders = await Order.find({ userId });
            return orders;
        } catch (error) {
            throw new Error('Failed to retrieve user orders.');
        }
    }

    async cancelOrder(orderId) {
        try {
            const canceledOrder = await Order.findByIdAndDelete(orderId);
            if (!canceledOrder) {
                throw new Error('Order not found.');
            }
            return canceledOrder;
        } catch (error) {
            throw new Error('Failed to cancel order.');
        }
    }

    async retrievePaymentDetails(orderId) {
        try {
            const paymentDetails = await Order.findById(orderId, 'payment');
            if (!paymentDetails) {
                throw new Error('Order not found.');
            }
            return paymentDetails.payment;
        } catch (error) {
            throw new Error('Failed to retrieve payment details.');
        }
    }

    async processPayment(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found.');
            }


            order.payment.status = 'Paid';
            order.payment.transactionId = '1234567890';
            await order.save();

            return { message: 'Payment processed successfully.' };
        } catch (error) {
            throw new Error('Failed to process payment.');
        }
    }

    async getOrderAnalytics() {
        try {
            const orders = await Order.find();
            const totalOrders = orders.length;
            let totalOrderAmount = 0;
            let highestOrderAmount = 0;
            let lowestOrderAmount = Number.MAX_VALUE;
            orders.forEach(order => {
                const orderTotal = order.totalAmount;
                totalOrderAmount += orderTotal;
                if (orderTotal > highestOrderAmount) {
                    highestOrderAmount = orderTotal;
                }
                if (orderTotal < lowestOrderAmount) {
                    lowestOrderAmount = orderTotal;
                }
            });
            const averageOrderAmount = totalOrderAmount / totalOrders;
            const orderAnalytics = {
                totalOrders,
                averageOrderAmount,
                highestOrderAmount,
                lowestOrderAmount,
            };
            return orderAnalytics;
        } catch (error) {
            throw new Error('Failed to retrieve order analytics.');
        }
    }

    async generateInvoice(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found.');
            }


            const invoice = {
                orderId: order._id,
                orderDate: order.createdAt,
                totalAmount: order.totalAmount,

            };
            return invoice;
        } catch (error) {
            throw new Error('Failed to generate invoice.');
        }
    }

    async trackShipment(orderId) {
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                throw new Error('Order not found.');
            }


            const shipmentDetails = {
                status: 'Shipped',
                trackingNumber: '1234567890',

            };
            return shipmentDetails;
        } catch (error) {
            throw new Error('Failed to track shipment.');
        }
    }

    async getRevenueAnalytics() {
        try {
            const orders = await Order.find();
            const revenueAnalytics = orders.reduce(
                (analytics, order) => {
                    const orderTotal = order.totalAmount;
                    analytics.totalRevenue += orderTotal;
                    analytics.highestRevenue = Math.max(analytics.highestRevenue, orderTotal);
                    analytics.lowestRevenue = Math.min(analytics.lowestRevenue, orderTotal);
                    return analytics;
                },
                {
                    totalRevenue: 0,
                    highestRevenue: 0,
                    lowestRevenue: Number.MAX_VALUE,
                }
            );
            return revenueAnalytics;
        } catch (error) {
            throw new Error('Failed to retrieve revenue analytics.');
        }
    }

    async hasOrderedProduct(userId, productId) {
        try {
            const order = await Order.findOne({
                user: userId,
                'products.product': productId
            });
            return !!order;
        } catch (error) {
            console.error('Error checking order:', error);
            return false;
        }
    }

}

module.exports = OrderServiceImpl;
