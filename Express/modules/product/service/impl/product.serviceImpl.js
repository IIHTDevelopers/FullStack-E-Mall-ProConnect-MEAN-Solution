const Product = require("../../dao/models/product.model");
const Order = require("../../../../modules/order/dao/models/order.model");
const Cart = require("../../dao/models/cart.model");
const ProductService = require('../product.service');

class ProductServiceImpl extends ProductService {
    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (error) {
            throw new Error('Failed to create product.');
        }
    }

    async getProduct(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to get product.');
        }
    }

    async updateProduct(productId, updatedProduct) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to update product.');
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error('Product not found.');
            }
            return product;
        } catch (error) {
            throw new Error('Failed to delete product.');
        }
    }

    async searchProduct(name, description) {
        try {
            const query = {};

            if (name) {
                query.name = { $regex: name, $options: 'i' };
            }

            if (description) {
                query.description = { $regex: description, $options: 'i' };
            }

            const products = await Product.find(query);
            return products;
        } catch (error) {
            throw new Error('Failed to search for products.');
        }
    }

    async getTopRatedProducts(limit) {
        try {
            const products = await Product.find().sort({ ratings: -1 }).limit(limit);
            return products;
        } catch (error) {
            throw new Error('Failed to get top rated products.');
        }
    }

    async getAllProducts() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw new Error('Failed to get all products.');
        }
    }

    async applyDiscount(userId, discountPercentage) {
        try {
            const cart = await Cart.findOne({ userId });

            if (!cart) {
                throw new Error('Cart not found.');
            }

            if (discountPercentage < 0 || discountPercentage > 100) {
                throw new Error('Invalid discount percentage.');
            }

            // Calculate the discount factor
            const discountFactor = 1 - discountPercentage / 100;

            // Apply the discount to each item's price in the cart
            cart.items.forEach((item) => {
                item.product.price *= discountFactor;
            });

            // Update the cart with the discounted prices
            await cart.save();

            return { message: 'Discount applied successfully.' };
        } catch (error) {
            throw new Error('Failed to apply discount.');
        }
    }

    async checkoutCart(userId, paymentMethod, address) {
        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                throw new Error('Cart not found.');
            }
            let totalAmount = 0;
            cart.items.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
            });
            const order = new Order({
                user: cart.userId,
                items: cart.items,
                products: cart.items.map(item => ({
                    product: item.product,
                    quantity: item.quantity
                })),
                paymentDetails: {
                    paymentMethod
                },
                shipmentDetails: {
                    address
                },
                completed: false,
                totalAmount,
            });
            try {
                await order.save();
                await Cart.findByIdAndDelete(cart._id);
                return { message: 'Checkout completed successfully.', orderId: order._id };
            } catch (er) {
                return { message: 'Checkout completed successfully.', er };
            }
        } catch (error) {
            throw new Error('Failed to complete checkout.');
        }
    }

    async addToCart(userId, productId, quantity, price) {
        try {
            const existingCartItem = await Cart.findOne({ userId, 'items.product': productId });

            if (existingCartItem) {
                await Cart.updateOne(
                    { userId, 'items.product': productId },
                    { $inc: { 'items.$.quantity': quantity } },
                    { price }
                );
            } else {
                const cart = await Cart.findOneAndUpdate(
                    { userId },
                    { $addToSet: { items: { product: productId, quantity, price } } },
                    { new: true, upsert: true }
                );
                return cart;
            }
        } catch (error) {
            throw new Error('Failed to add products to the cart.');
        }
    }

    async viewCart(userId) {
        try {
            const cart = await Cart.findOne({ userId }).populate('items.product');
            return cart;
        } catch (error) {
            throw new Error('Failed to view the contents of the cart.');
        }
    }

    async updateCartItem(userId, itemId, quantity) {
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId, 'items._id': itemId },
                { $set: { 'items.$.quantity': quantity } },
                { new: true }
            );
            return cart;
        } catch (error) {
            throw new Error('Failed to update item in the cart.');
        }
    }

    async removeCartItem(userId, itemId) {
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $pull: { items: { _id: itemId } } },
                { new: true }
            );
            return cart;
        } catch (error) {
            throw new Error('Failed to remove item from the cart.');
        }
    }
}

module.exports = ProductServiceImpl;
