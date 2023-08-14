var mongoose = require('mongoose');

var ProductSchema = require('../schemas/product.schema');
module.exports = mongoose.model('Product', ProductSchema); 