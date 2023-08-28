const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
