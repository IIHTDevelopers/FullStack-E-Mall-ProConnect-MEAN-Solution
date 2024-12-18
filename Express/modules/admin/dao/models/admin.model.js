var mongoose = require('mongoose');

var AdminSchema = require('../schemas/admin.schema');
module.exports = mongoose.model('Admin', AdminSchema); 