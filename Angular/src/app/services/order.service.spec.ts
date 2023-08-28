import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';

describe('OrderService', () => {
    let orderService: OrderService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/orders';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrderService]
        });

        orderService = TestBed.inject(OrderService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(orderService).toBeTruthy();
        });

        it('should fetch all orders', () => {
            const mockOrders: Order[] = [
                {
                    _id: '1',
                    user: 'user123',
                    products: [
                        { product: 'product123', quantity: 2 },
                        { product: 'product456', quantity: 1 }
                    ],
                    status: 'Pending',
                    totalAmount: 150,
                    paymentDetails: {
                        paymentMethod: 'Credit Card',
                        transactionId: 'transaction123',
                        timestamp: new Date()
                    },
                    shipmentDetails: {
                        address: '123 Main St, City, Country',
                        trackingNumber: 'tracking123',
                        estimatedDelivery: new Date()
                    }
                }
            ];
            orderService.getAllOrders().subscribe((orders: Order[]) => {
                expect(orders).toEqual(mockOrders);
            });
            const req = httpTestingController.expectOne(`${baseURL}/all`);
            expect(req.request.method).toBe('GET');
            req.flush(mockOrders);
        });

        it('should create an order', () => {
            const mockOrder: Order = {
                _id: '1',
                user: 'user123',
                products: [
                    { product: 'product123', quantity: 2 },
                    { product: 'product456', quantity: 1 }
                ],
                status: 'Pending',
                totalAmount: 150,
                paymentDetails: {
                    paymentMethod: 'Credit Card',
                    transactionId: 'transaction123',
                    timestamp: new Date()
                },
                shipmentDetails: {
                    address: '123 Main St, City, Country',
                    trackingNumber: 'tracking123',
                    estimatedDelivery: new Date()
                }
            };
            orderService.createOrder(mockOrder).subscribe((createdOrder: Order) => {
                expect(createdOrder).toEqual(mockOrder);
            });
            const req = httpTestingController.expectOne(`${baseURL}/create`);
            expect(req.request.method).toBe('POST');
            req.flush(mockOrder);
        });

        it('should fetch an order by ID', () => {
            const mockOrderId = '1';
            const mockOrder: Order = {
                _id: '1',
                user: 'user123',
                products: [
                    { product: 'product123', quantity: 2 },
                    { product: 'product456', quantity: 1 }
                ],
                status: 'Pending',
                totalAmount: 150,
                paymentDetails: {
                    paymentMethod: 'Credit Card',
                    transactionId: 'transaction123',
                    timestamp: new Date()
                },
                shipmentDetails: {
                    address: '123 Main St, City, Country',
                    trackingNumber: 'tracking123',
                    estimatedDelivery: new Date()
                }
            };
            orderService.getOrder(mockOrderId).subscribe((fetchedOrder: Order) => {
                expect(fetchedOrder).toEqual(mockOrder);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockOrderId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockOrder);
        });

        it('should fetch user orders', () => {
            const userId = 'user123';
            const mockUserOrders: Order[] = [
                {
                    _id: '1',
                    user: 'user123',
                    products: [
                        { product: 'product123', quantity: 2 },
                        { product: 'product456', quantity: 1 }
                    ],
                    status: 'Pending',
                    totalAmount: 150,
                    paymentDetails: {
                        paymentMethod: 'Credit Card',
                        transactionId: 'transaction123',
                        timestamp: new Date()
                    },
                    shipmentDetails: {
                        address: '123 Main St, City, Country',
                        trackingNumber: 'tracking123',
                        estimatedDelivery: new Date()
                    }
                }
            ];
            orderService.getUserOrders(userId).subscribe((userOrders: Order[]) => {
                expect(userOrders).toEqual(mockUserOrders);
            });
            const req = httpTestingController.expectOne(`${baseURL}/user/${userId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUserOrders);
        });

        it('should cancel an order', () => {
            const orderId = '1';
            const mockCancelledOrder: Order = {
                _id: '1',
                user: 'user123',
                products: [
                    { product: 'product123', quantity: 2 },
                    { product: 'product456', quantity: 1 }
                ],
                status: 'Pending',
                totalAmount: 150,
                paymentDetails: {
                    paymentMethod: 'Credit Card',
                    transactionId: 'transaction123',
                    timestamp: new Date()
                },
                shipmentDetails: {
                    address: '123 Main St, City, Country',
                    trackingNumber: 'tracking123',
                    estimatedDelivery: new Date()
                }
            };
            orderService.cancelOrder(orderId).subscribe((cancelledOrder: Order) => {
                expect(cancelledOrder).toEqual(mockCancelledOrder);
            });
            const req = httpTestingController.expectOne(`${baseURL}/cancel/${orderId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockCancelledOrder);
        });

        it('should fetch payment details', () => {
            const orderId = '1';
            const mockPaymentDetails = {
                paymentMethod: 'Credit Card',
                transactionId: '12345',
                timestamp: new Date()
            };
            orderService.getPaymentDetails(orderId).subscribe((paymentDetails: any) => {
                expect(paymentDetails).toEqual(mockPaymentDetails);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${orderId}/payment`);
            expect(req.request.method).toBe('GET');
            req.flush(mockPaymentDetails);
        });

        it('should process payment', () => {
            const orderId = '1';
            const mockProcessedPayment = {
                transactionId: 'transaction123',
                status: 'Success',
                amount: 100.0,
                timestamp: new Date()
            };
            orderService.processPayment(orderId).subscribe((processedPayment: any) => {
                expect(processedPayment).toEqual(mockProcessedPayment);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${orderId}/pay`);
            expect(req.request.method).toBe('POST');
            req.flush(mockProcessedPayment);
        });

        it('should fetch order analytics', () => {
            const mockAnalytics = {
                totalOrders: 100,
                totalRevenue: 5000,
                averageOrderAmount: 50
            };
            orderService.getOrderAnalytics().subscribe((analytics: any) => {
                expect(analytics).toEqual(mockAnalytics);
            });
            const req = httpTestingController.expectOne(`${baseURL}/analytics`);
            expect(req.request.method).toBe('GET');
            req.flush(mockAnalytics);
        });

        it('should generate invoice', () => {
            const orderId = '1';
            const mockInvoice = 'Invoice content goes here...';
            orderService.generateInvoice(orderId).subscribe((invoice: any) => {
                expect(invoice).toEqual(mockInvoice);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${orderId}/invoice`);
            expect(req.request.method).toBe('GET');
            req.flush(mockInvoice);
        });

        it('should track shipment', () => {
            const orderId = '1';
            const mockShipmentInfo = {
                trackingNumber: 'tracking123',
                estimatedDelivery: new Date(),
                status: 'Shipped'
            };
            orderService.trackShipment(orderId).subscribe((shipmentInfo: any) => {
                expect(shipmentInfo).toEqual(mockShipmentInfo);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${orderId}/shipment`);
            expect(req.request.method).toBe('GET');
            req.flush(mockShipmentInfo);
        });

        it('should fetch revenue analytics', () => {
            const mockRevenueAnalytics = {
                totalRevenue: 100000,
                topProducts: ['Product A', 'Product B'],
                topCategories: ['Category X', 'Category Y']
            };
            orderService.getRevenueAnalytics().subscribe((revenueAnalytics: any) => {
                expect(revenueAnalytics).toEqual(mockRevenueAnalytics);
            });
            const req = httpTestingController.expectOne(`${baseURL}/revenue`);
            expect(req.request.method).toBe('GET');
            req.flush(mockRevenueAnalytics);
        });

        it('should check if a product is ordered by a user', () => {
            const userId = 'user123';
            const productId = 'product456';
            const mockIsOrderedResult = true;
            orderService.getIsOrdered(userId, productId).subscribe((isOrderedResult: any) => {
                expect(isOrderedResult).toEqual(mockIsOrderedResult);
            });
            const req = httpTestingController.expectOne(`${baseURL}/ordered/${userId}/${productId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockIsOrderedResult);
        });
    });
});
