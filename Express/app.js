var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var adminRouter = require('./modules/admin/routes/admin.routes');
var blogRouter = require('./modules/blog/routes/blogs.routes');
var orderRouter = require('./modules/order/routes/order.routes');
var productRouter = require('./modules/product/routes/product.routes');
var userRouter = require('./modules/user/routes/user.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// need to add routes here
app.use('/api/admin', adminRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
