const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
    totalAmount: { type: Number, required: true },
    paymentDetails: {
        paymentMethod: { type: String, required: true },
        transactionId: { type: String },
        timestamp: { type: Date },
    },
    shipmentDetails: {
        address: { type: String, required: true },
        trackingNumber: { type: String },
        estimatedDelivery: { type: Date },
    },
});

module.exports = OrderSchema;
