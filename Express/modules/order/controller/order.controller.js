const OrderServiceImpl = require("../service/impl/order.serviceImpl");

const orderService = new OrderServiceImpl();

class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAllOrders(req.body);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order.' });
        }
    }

    async createOrder(req, res) {
        try {
            const newOrder = await orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order.' });
        }
    }

    async getOrder(req, res) {
        try {
            const order = await orderService.getOrder(req.params.id);
            res.json(order);
        } catch (error) {
            res.status(404).json({ error: 'Order not found.' });
        }
    }

    async updateOrder(req, res) {
        try {
            const updatedOrder = await orderService.updateOrder(req.params.id, req.body);
            res.json(updatedOrder);
        } catch (error) {
            res.status(404).json({ error: 'Order not found.' });
        }
    }

    async deleteOrder(req, res) {
        try {
            const deletedOrder = await orderService.deleteOrder(req.params.id);
            res.json(deletedOrder);
        } catch (error) {
            res.status(404).json({ error: 'Order not found.' });
        }
    }

    async getUserOrders(req, res) {
        try {
            const userId = req.params.userId;
            const userOrders = await orderService.getUserOrders(userId);
            res.json(userOrders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve user orders.' });
        }
    }

    async cancelOrder(req, res) {
        try {
            const orderId = req.params.id;
            const canceledOrder = await orderService.cancelOrder(orderId);
            res.json(canceledOrder);
        } catch (error) {
            res.status(404).json({ error: 'Order not found.' });
        }
    }

    async getPaymentDetails(req, res) {
        try {
            const orderId = req.params.id;
            const paymentDetails = await orderService.retrievePaymentDetails(orderId);
            res.json(paymentDetails);
        } catch (error) {
            res.status(404).json({ error: 'Order not found.' });
        }
    }

    async processPayment(req, res) {
        try {
            const orderId = req.params.id;
            await orderService.processPayment(orderId);
            res.json({ message: 'Payment processed successfully.' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to process payment.' });
        }
    }

    async getOrderAnalytics(req, res) {
        try {
            const orderAnalytics = await orderService.getOrderAnalytics();
            res.json(orderAnalytics);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve order analytics.' });
        }
    }

    async generateInvoice(req, res) {
        try {
            const orderId = req.params.id;
            const invoice = await orderService.generateInvoice(orderId);
            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate invoice.' });
        }
    }

    async trackShipment(req, res) {
        try {
            const orderId = req.params.id;
            const shipmentDetails = await orderService.trackShipment(orderId);
            res.json(shipmentDetails);
        } catch (error) {
            res.status(500).json({ error: 'Failed to track shipment.' });
        }
    }

    async getRevenueAnalytics(req, res) {
        try {
            const revenueAnalytics = await orderService.getRevenueAnalytics();
            res.json(revenueAnalytics);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve revenue analytics.' });
        }
    }

    async hasOrderedProduct(req, res) {
        try {
            const { userId, productId } = req.params;
            const hasOrdered = await orderService.hasOrderedProduct(userId, productId);
            res.json(hasOrdered);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve information about this product for this user' });
        }
    }
}

module.exports = OrderController;
