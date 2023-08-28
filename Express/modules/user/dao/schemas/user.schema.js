const bcrypt = require('bcrypt');
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
    isAdmin: { type: Number, default: 0 },
    token: String,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const trimmedCandidatePassword = candidatePassword.trim();
        const isMatch = await bcrypt.compare(trimmedCandidatePassword, this.password);
        return isMatch;
    } catch (error) {
        return false;
    }
};

module.exports = UserSchema;