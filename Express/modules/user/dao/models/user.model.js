var mongoose = require('mongoose');

var UserSchema = require('../schemas/user.schema');
module.exports = mongoose.model('User', UserSchema); 