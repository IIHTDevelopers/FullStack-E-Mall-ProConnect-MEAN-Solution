const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        timestamp: { type: Date, default: Date.now },
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = BlogSchema;
