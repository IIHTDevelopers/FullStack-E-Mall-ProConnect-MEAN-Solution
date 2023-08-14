const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
        firstName: String,
        lastName: String,
        address: String,
    },
    activityLog: [{
        action: String,
        timestamp: { type: Date, default: Date.now },
    }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = UserSchema;