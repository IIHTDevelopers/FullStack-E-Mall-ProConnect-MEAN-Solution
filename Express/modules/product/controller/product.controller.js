const ProductServiceImpl = require("../service/impl/product.serviceImpl");

const productService = new ProductServiceImpl();

class ProductController {
    async createProduct(req, res) {
        try {
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product.' });
        }
    };

    async getProduct(req, res) {
        try {
            const product = await productService.getProduct(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };

    async updateProduct(req, res) {
        try {
            const updatedProduct = await productService.updateProduct(req.params.id, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await productService.deleteProduct(req.params.id);
            res.json(deletedProduct);
        } catch (error) {
            res.status(404).json({ error: 'Product not found.' });
        }
    };

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve products.' });
        }
    };

    async getTopRatedProducts(req, res) {
        try {
            const limit = parseInt(req.params.limit);
            const topRatedProducts = await productService.getTopRatedProducts(limit);
            res.json(topRatedProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve top rated products.' });
        }
    };

    async searchProduct(req, res) {
        try {
            const { name, description } = req.query;
            const foundProducts = await productService.searchProduct(name, description);
            res.json(foundProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search products.' });
        }
    };

    async applyDiscount(req, res) {
        try {
            const userId = req.params.userId;
            const discountPercentage = parseFloat(req.body.discountPercentage);
            const result = await productService.applyDiscount(userId, discountPercentage);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to apply discount.' });
        }
    };

    async checkoutCart(req, res) {
        try {
            const userId = req.params.userId;
            const { paymentMethod, address } = req.body;
            const result = await productService.checkoutCart(userId, paymentMethod, address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to checkout cart.' });
        }
    };

    async addToCart(req, res) {
        try {
            const userId = req.params.userId;
            const productId = req.body.productId;
            const quantity = parseFloat(req.body.quantity);
            const price = parseFloat(req.body.price);
            const result = await productService.addToCart(userId, productId, quantity, price);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add to cart.' });
        }
    };

    async viewCart(req, res) {
        try {
            const userId = req.params.userId;
            const cart = await productService.viewCart(userId);
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Failed to view cart.' });
        }
    };

    async updateCartItem(req, res) {
        try {
            const userId = req.params.userId;
            const itemId = req.params.itemId;
            const quantity = parseInt(req.body.quantity);
            const result = await productService.updateCartItem(userId, itemId, quantity);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update cart item.' });
        }
    };

    async removeCartItem(req, res) {
        try {
            const userId = req.params.userId;
            const itemId = req.params.itemId;
            const result = await productService.removeCartItem(userId, itemId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove cart item.' });
        }
    };
}

// const productController = new ProductController();

module.exports = ProductController;
