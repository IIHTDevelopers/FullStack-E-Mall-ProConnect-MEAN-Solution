const express = require('express');
const router = express.Router();

const OrderController = require('../controller/order.controller');
const orderController = new OrderController();

router.post('/create', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/user/:userId', orderController.getUserOrders);
router.delete('/cancel/:id', orderController.cancelOrder);
router.get('/:id/payment', orderController.getPaymentDetails);
router.post('/:id/pay', orderController.processPayment);
router.get('/analytics', orderController.getOrderAnalytics);
router.get('/:id/invoice', orderController.generateInvoice);
router.get('/:id/shipment', orderController.trackShipment);
router.get('/revenue', orderController.getRevenueAnalytics);

module.exports = router;
