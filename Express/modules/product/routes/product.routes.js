const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product.controller');
const productController = new ProductController();

router.get('/all', productController.getAllProducts);
router.post('/create', productController.createProduct);
router.get('/search', productController.searchProduct);
router.get('/top-rated/:limit', productController.getTopRatedProducts);
router.post('/discount/:userId', productController.applyDiscount);
router.get('/cart/:userId', productController.viewCart);
router.post('/cart/add/:userId', productController.addToCart);
router.post('/cart/checkout/:userId', productController.checkoutCart);
router.put('/cart/update/:userId/:itemId', productController.updateCartItem);
router.delete('/cart/remove/:userId/:itemId', productController.removeCartItem);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
