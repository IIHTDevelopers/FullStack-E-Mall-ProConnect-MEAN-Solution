var mongoose = require('mongoose');

var BlogSchema = require('../schemas/blog.schema');
module.exports = mongoose.model('Blog', BlogSchema);