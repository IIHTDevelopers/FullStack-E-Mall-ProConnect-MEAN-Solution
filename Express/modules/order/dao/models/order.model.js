var mongoose = require('mongoose');

var OrderSchema = require('../schemas/order.schema');
module.exports = mongoose.model('Order', OrderSchema);