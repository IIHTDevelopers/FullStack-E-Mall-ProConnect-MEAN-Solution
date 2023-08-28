const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product.controller');
const adminMiddleware = require('../../middleware/authAdminMiddleware');
const authMiddleware = require('../../middleware/authUserMiddleware');
const productController = new ProductController();

router.get('/all', productController.getAllProducts);
router.post('/create', authMiddleware, adminMiddleware, productController.createProduct);
router.get('/search', productController.searchProduct);
router.get('/top-rated/:limit', authMiddleware, productController.getTopRatedProducts);
router.post('/discount/:userId', authMiddleware, productController.applyDiscount);
router.get('/cart/:userId', authMiddleware, productController.viewCart);
router.post('/cart/add/:userId', authMiddleware, productController.addToCart);
router.post('/cart/checkout/:userId', authMiddleware, productController.checkoutCart);
router.put('/cart/update/:userId/:itemId', authMiddleware, productController.updateCartItem);
router.delete('/cart/remove/:userId/:itemId', authMiddleware, productController.removeCartItem);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
