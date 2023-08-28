import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
    let productService: ProductService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/products';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });

        productService = TestBed.inject(ProductService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(productService).toBeTruthy();
        });

        it('should create a product', () => {
            const mockProduct: Product = {
                name: 'Product 1',
                price: 100,
                ratings: []
            };
            productService.createProduct(mockProduct).subscribe((createdProduct: Product) => {
                expect(createdProduct).toEqual(mockProduct);
            });
            const req = httpTestingController.expectOne(`${baseURL}/create`);
            expect(req.request.method).toBe('POST');
            req.flush(mockProduct);
        });

        it('should fetch a product by ID', () => {
            const mockProductId = '1';
            const mockProduct: Product = {
                _id: '1',
                name: 'Product 1',
                price: 100,
                ratings: []
            };
            productService.getProduct(mockProductId).subscribe((fetchedProduct: Product) => {
                expect(fetchedProduct).toEqual(mockProduct);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockProductId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockProduct);
        });

        it('should update a product', () => {
            const mockProductId = '1';
            const mockProduct: Product = {
                _id: '1',
                name: 'Product 1',
                price: 100,
                ratings: []
            };
            const updatedMockProduct: Product = { ...mockProduct, name: 'Updated Product' };
            productService.updateProduct(mockProductId, updatedMockProduct).subscribe((updatedProduct: Product) => {
                expect(updatedProduct).toEqual(updatedMockProduct);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockProductId}`);
            expect(req.request.method).toBe('PUT');
            req.flush(updatedMockProduct);
        });

        it('should delete a product', () => {
            const mockProductId = '1';
            const mockProduct: Product = {
                _id: '1',
                name: 'Product 1',
                price: 100,
                ratings: []
            };
            productService.deleteProduct(mockProductId).subscribe((deletedProduct: Product) => {
                expect(deletedProduct).toEqual(mockProduct);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockProductId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockProduct);
        });

        it('should fetch all products', () => {
            const mockProducts: Product[] = [
                {
                    _id: '1',
                    name: 'Product 1',
                    price: 100,
                    ratings: []
                },
                {
                    _id: '2',
                    name: 'Product 2',
                    price: 200,
                    ratings: []
                }
            ];
            productService.getAllProducts().subscribe((products: Product[]) => {
                expect(products).toEqual(mockProducts);
            });
            const req = httpTestingController.expectOne(`${baseURL}/all`);
            expect(req.request.method).toBe('GET');
            req.flush(mockProducts);
        });

        it('should get top rated products', () => {
            const limit = 5;
            const mockTopRatedProducts: Product[] = [
                {
                    _id: '1',
                    name: 'Top Rated Product 1',
                    price: 100,
                    ratings: [4, 5, 4, 5]
                },
                {
                    _id: '2',
                    name: 'Top Rated Product 2',
                    price: 200,
                    ratings: [5, 5, 5, 4]
                }
            ];
            productService.getTopRatedProducts(limit).subscribe((topRatedProducts: Product[]) => {
                expect(topRatedProducts).toEqual(mockTopRatedProducts);
            });
            const req = httpTestingController.expectOne(`${baseURL}/top-rated/${limit}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockTopRatedProducts);
        });

        it('should search for products', () => {
            const mockName = 'Product';
            const mockDescription = 'Description';
            const mockSearchedProducts: Product[] = [
                {
                    _id: '1',
                    name: 'Searched Product 1',
                    price: 100,
                    ratings: []
                },
                {
                    _id: '2',
                    name: 'Searched Product 2',
                    price: 200,
                    ratings: []
                }
            ];
            productService.searchProduct(mockName, mockDescription).subscribe((searchedProducts: Product[]) => {
                expect(searchedProducts).toEqual(mockSearchedProducts);
            });
            const req = httpTestingController.expectOne(`${baseURL}/search?name=${mockName}&description=${mockDescription}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockSearchedProducts);
        });

        it('should apply discount', () => {
            const userId = 'user123';
            const discountPercentage = 10;
            const mockDiscountResponse = {
                success: true,
                message: 'Discount applied successfully'
            };
            productService.applyDiscount(userId, discountPercentage).subscribe((response: any) => {
                expect(response).toEqual(mockDiscountResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/discount/${userId}`);
            expect(req.request.method).toBe('POST');
            req.flush(mockDiscountResponse);
        });

        it('should checkout cart', () => {
            const userId = 'user123';
            const paymentMethod = 'Credit Card';
            const address = '123 Main St, City, Country';
            const mockCheckoutResponse = {
                success: true,
                message: 'Cart checkout successful'
            };
            productService.checkoutCart(userId, paymentMethod, address).subscribe((response: any) => {
                expect(response).toEqual(mockCheckoutResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cart/checkout/${userId}`);
            expect(req.request.method).toBe('POST');
            req.flush(mockCheckoutResponse);
        });

        it('should add to cart', () => {
            const userId = 'user123';
            const productId = 'product123';
            const quantity = 2;
            const price = 100;
            const mockAddToCartResponse = {
                success: true,
                message: 'Product added to cart successfully'
            };
            productService.addToCart(userId, productId, quantity, price).subscribe((response: any) => {
                expect(response).toEqual(mockAddToCartResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cart/add/${userId}`);
            expect(req.request.method).toBe('POST');
            req.flush(mockAddToCartResponse);
        });

        it('should view cart', () => {
            const userId = 'user123';
            const mockCartItems = [
                {
                    _id: '1',
                    product: {
                        _id: 'product123',
                        name: 'Product 1',
                        price: 100,
                        ratings: []
                    },
                    quantity: 2,
                    price: 200
                }
            ];
            productService.viewCart(userId).subscribe((cartItems: any) => {
                expect(cartItems).toEqual(mockCartItems);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cart/${userId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockCartItems);
        });

        it('should update cart item', () => {
            const userId = 'user123';
            const itemId = 'item123';
            const quantity = 3;
            const mockUpdateCartItemResponse = {
                success: true,
                message: 'Cart item updated successfully'
            };
            productService.updateCartItem(userId, itemId, quantity).subscribe((response: any) => {
                expect(response).toEqual(mockUpdateCartItemResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cart/update/${userId}/${itemId}`);
            expect(req.request.method).toBe('PUT');
            req.flush(mockUpdateCartItemResponse);
        });

        it('should remove cart item', () => {
            const userId = 'user123';
            const itemId = 'item123';
            const mockRemoveCartItemResponse = {
                success: true,
                message: 'Cart item removed successfully'
            };
            productService.removeCartItem(userId, itemId).subscribe((response: any) => {
                expect(response).toEqual(mockRemoveCartItemResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cart/remove/${userId}/${itemId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockRemoveCartItemResponse);
        });
    });
});
