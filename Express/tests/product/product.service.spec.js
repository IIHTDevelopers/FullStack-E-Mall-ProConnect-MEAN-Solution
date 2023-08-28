const ProductServiceImpl = require('../../modules/product/service/impl/product.serviceImpl');
const Product = require('../../modules/product/dao/models/product.model');
const Cart = require('../../modules/product/dao/models/cart.model');

jest.mock('../../modules/product/dao/models/product.model');

let productServiceBoundaryTest = `ProductService functional test`;
describe('Product Service', () => {
    let productService;

    beforeEach(() => {
        productService = new ProductServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${productServiceBoundaryTest} should create a new product`, async () => {
            const productData = { name: 'Test Product', price: 19.99 };
            Product.create.mockResolvedValue(productData);

            const result = await productService.createProduct(productData);
            expect(result).toEqual(productData);
        });

        it(`${productServiceBoundaryTest} should get product by ID`, async () => {
            const productId = 'product_id';
            const product = { _id: productId, name: 'Test Product' };
            Product.findById.mockResolvedValue(product);

            const result = await productService.getProduct(productId);
            expect(result).toEqual(product);
        });

        it(`${productServiceBoundaryTest} should update product by ID`, async () => {
            const productId = 'product_id';
            const updatedProductData = { name: 'Updated Product', price: 29.99 };
            const updatedProduct = { _id: productId, ...updatedProductData };
            Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

            const result = await productService.updateProduct(productId, updatedProductData);
            expect(result).toEqual(updatedProduct);
        });

        it(`${productServiceBoundaryTest} should delete product by ID`, async () => {
            const productId = 'product_id';
            const deletedProduct = { _id: productId, name: 'Deleted Product', price: 39.99 };
            Product.findByIdAndDelete.mockResolvedValue(deletedProduct);

            const result = await productService.deleteProduct(productId);
            expect(result).toEqual(deletedProduct);
        });

        it(`${productServiceBoundaryTest} should throw an error when product is not found for getProduct`, async () => {
            const productId = 'non_existing_id';
            Product.findById.mockResolvedValue(null);
            await expect(productService.getProduct(productId)).rejects.toThrow('Failed to get product.');
        });

        it(`${productServiceBoundaryTest} should throw an error when product is not found for updateProduct`, async () => {
            const productId = 'non_existing_id';
            const updatedProductData = { name: 'Updated Product', price: 29.99 };
            Product.findByIdAndUpdate.mockResolvedValue(null);
            await expect(productService.updateProduct(productId, updatedProductData)).rejects.toThrow('Failed to update product.');
        });

        it(`${productServiceBoundaryTest} should throw an error when product is not found for deleteProduct`, async () => {
            const productId = 'non_existing_id';
            Product.findByIdAndDelete.mockResolvedValue(null);
            await expect(productService.deleteProduct(productId)).rejects.toThrow('Failed to delete product.');
        });

        it(`${productServiceBoundaryTest} should fetch product by ID`, async () => {
            const productId = 'product_id';
            const product = { _id: productId, name: 'Test Product', price: 19.99 };
            Product.findById.mockResolvedValue(product);

            const result = await productService.getProduct(productId);
            expect(result).toEqual(product);
        });

        it(`${productServiceBoundaryTest} should throw an error when failing to create product`, async () => {
            const productData = { name: 'Failed Product', price: 99.99 };
            const error = new Error('Failed to create product.');
            Product.create.mockRejectedValue(error);
            await expect(productService.createProduct(productData)).rejects.toThrow(error);
        });

        it(`${productServiceBoundaryTest} should throw an error when failing to update product by ID`, async () => {
            const productId = 'non_existing_id';
            const updatedProductData = { name: 'Updated Product', price: 29.99 };
            const error = new Error('Failed to update product.');
            Product.findByIdAndUpdate.mockRejectedValue(error);
            await expect(productService.updateProduct(productId, updatedProductData)).rejects.toThrow(error);
        });

        it(`${productServiceBoundaryTest} should throw an error when failing to delete product by ID`, async () => {
            const productId = 'non_existing_id';
            const error = new Error('Failed to delete product.');
            Product.findByIdAndDelete.mockRejectedValue(error);
            await expect(productService.deleteProduct(productId)).rejects.toThrow(error);
        });

        it(`${productServiceBoundaryTest} should update product by ID and return updated product`, async () => {
            const productId = 'product_id';
            const updatedProductData = { name: 'Updated Product', price: 29.99 };
            const updatedProduct = { _id: productId, ...updatedProductData };
            Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

            const result = await productService.updateProduct(productId, updatedProductData);
            expect(result).toEqual(updatedProduct);
        });

        it(`${productServiceBoundaryTest} should search for products by name and description`, async () => {
            const productName = "Test Product";
            const productDescription = "This is a test product.";
            const products = [
                { _id: "product_id1", name: productName, description: productDescription, price: 19.99 },
                { _id: "product_id2", name: productName, description: productDescription, price: 29.99 },
            ];
            const query = { name: { $regex: productName, $options: "i" }, description: { $regex: productDescription, $options: "i" } };
            Product.find.mockResolvedValue(products);

            const result = await productService.searchProduct(productName, productDescription);
            expect(result).toEqual(products);
        });

        it(`${productServiceBoundaryTest} should throw an error when failing to search for products`, async () => {
            const productName = "Test Product";
            const productDescription = "This is a test product.";
            const error = new Error("Failed to search for products.");
            Product.find.mockRejectedValue(error);

            await expect(productService.searchProduct(productName, productDescription)).rejects.toThrow(error);
        });

        it(`${productServiceBoundaryTest} should update item quantity in the cart`, async () => {
            const userId = 'user_id';
            const itemId = 'item_id';
            const quantity = 3;
            const cartData = { userId, items: [{ _id: itemId, product: 'product_id', quantity: 2 }] };
            const updatedCartData = { ...cartData, _id: 'cart_id' };

            Cart.findOneAndUpdate = jest.fn().mockReturnValue(updatedCartData);

            const result = await productService.updateCartItem(userId, itemId, quantity);
            expect(result).toEqual(updatedCartData);
        });

        it(`${productServiceBoundaryTest} should remove item from the cart`, async () => {
            const userId = 'user_id';
            const itemId = 'item_id';
            const cartData = { userId, items: [{ _id: itemId, product: 'product_id', quantity: 2 }] };
            const updatedCartData = { ...cartData, _id: 'cart_id' };

            Cart.findOneAndUpdate = jest.fn().mockReturnValue(updatedCartData);

            const result = await productService.removeCartItem(userId, itemId);
            expect(result).toEqual(updatedCartData);
        });

        it(`${productServiceBoundaryTest} should add products to the cart`, async () => {
            const userId = 'user_id';
            const productId = 'product_id';
            const quantity = 2;
            const cartData = { userId, items: [{ product: productId, quantity }] };

            const mockCart = {
                _id: 'cart_id',
                userId,
                items: [{ _id: "item_id", product: productId, quantity }]
            };

            Cart.findOne = jest.fn().mockResolvedValue(null);
            Cart.prototype.save = jest.fn().mockResolvedValue(mockCart);

            const result = await productService.addToCart(userId, productId, quantity);
            expect(result).toEqual(mockCart);
        });

        it(`${productServiceBoundaryTest} should update item quantity in the cart`, async () => {
            const userId = 'user_id';
            const itemId = 'item_id';
            const quantity = 3;

            const mockCart = {
                _id: 'cart_id',
                userId,
                items: [{ _id: itemId, product: 'product_id', quantity: 2 }]
            };

            Cart.findOne = jest.fn().mockResolvedValue(mockCart);
            Cart.prototype.save = jest.fn().mockResolvedValue(mockCart);

            const result = await productService.updateCartItem(userId, itemId, quantity);
            expect(result).toEqual(mockCart);
        });

        it(`${productServiceBoundaryTest} should remove item from the cart`, async () => {
            const userId = 'user_id';
            const itemId = 'item_id';

            const mockCart = {
                _id: 'cart_id',
                userId,
                items: [{ _id: itemId, product: 'product_id', quantity: 2 }]
            };

            Cart.findOne = jest.fn().mockResolvedValue(mockCart);
            Cart.prototype.save = jest.fn().mockResolvedValue(mockCart);

            const result = await productService.removeCartItem(userId, itemId);
            expect(result).toEqual(mockCart);
        });
    });
});
