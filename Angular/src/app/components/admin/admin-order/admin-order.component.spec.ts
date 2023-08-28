import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOrderComponent } from './admin-order.component';
import { OrderService } from '../../../services/order.service';
import { of, throwError } from 'rxjs';
import { Order } from '../../../models/order.model';

describe('AdminOrderComponent', () => {
  let component: AdminOrderComponent;
  let fixture: ComponentFixture<AdminOrderComponent>;
  let orderService: OrderService;

  const orderServiceMock = {
    getAllOrders: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOrderComponent],
      providers: [{ provide: OrderService, useValue: orderServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load all orders on initialization', () => {
      const orders: Order[] = [
        {
          _id: 'order123',
          user: 'user123',
          products: [
            {
              product: 'product123',
              quantity: 2,
            },
            {
              product: 'product456',
              quantity: 3,
            },
          ],
          status: 'Pending',
          totalAmount: 350,
          paymentDetails: {
            paymentMethod: 'Credit Card',
            transactionId: 'txn123',
            timestamp: new Date('2023-08-27T12:00:00Z'),
          },
          shipmentDetails: {
            address: '123 Main St',
            trackingNumber: 'track123',
            estimatedDelivery: new Date('2023-09-03T00:00:00Z'),
          },
        },
        {
          _id: 'order456',
          user: 'user789',
          products: [
            {
              product: 'product789',
              quantity: 1,
            },
            {
              product: 'product101',
              quantity: 5,
            },
          ],
          status: 'Shipped',
          totalAmount: 620,
          paymentDetails: {
            paymentMethod: 'PayPal',
            transactionId: 'txn789',
            timestamp: new Date('2023-08-30T09:15:00Z'),
          },
          shipmentDetails: {
            address: '456 Elm St',
            trackingNumber: 'track456',
            estimatedDelivery: new Date('2023-09-07T00:00:00Z'),
          },
        }
      ];

      orderServiceMock.getAllOrders.mockReturnValue(of(orders));

      component.ngOnInit();

      expect(orderServiceMock.getAllOrders).toHaveBeenCalled();
      expect(component.orders).toEqual(orders);
    });

    it('should handle error while fetching orders', () => {
      const errorMessage = 'Failed to fetch orders';
      orderServiceMock.getAllOrders.mockReturnValue(throwError(errorMessage));

      console.error = jest.fn(); // Mock console.error to prevent actual logging

      component.ngOnInit();

      expect(orderServiceMock.getAllOrders).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error fetching all orders:', errorMessage);
      expect(component.orders).toEqual([]); // Orders should be empty due to the error
    });

    it('should render the order list correctly', () => {
      const orders: Order[] = [
        {
          _id: 'order123',
          user: 'user123',
          products: [
            {
              product: 'product123',
              quantity: 2,
            },
            {
              product: 'product456',
              quantity: 3,
            },
          ],
          status: 'Pending',
          totalAmount: 350,
          paymentDetails: {
            paymentMethod: 'Credit Card',
            transactionId: 'txn123',
            timestamp: new Date('2023-08-27T12:00:00Z'),
          },
          shipmentDetails: {
            address: '123 Main St',
            trackingNumber: 'track123',
            estimatedDelivery: new Date('2023-09-03T00:00:00Z'),
          },
        },
        {
          _id: 'order456',
          user: 'user789',
          products: [
            {
              product: 'product789',
              quantity: 1,
            },
            {
              product: 'product101',
              quantity: 5,
            },
          ],
          status: 'Shipped',
          totalAmount: 620,
          paymentDetails: {
            paymentMethod: 'PayPal',
            transactionId: 'txn789',
            timestamp: new Date('2023-08-30T09:15:00Z'),
          },
          shipmentDetails: {
            address: '456 Elm St',
            trackingNumber: 'track456',
            estimatedDelivery: new Date('2023-09-07T00:00:00Z'),
          },
        }
      ];

      orderServiceMock.getAllOrders.mockReturnValue(of(orders));
      fixture.detectChanges(); // Trigger change detection to render the component

      const orderRows = fixture.nativeElement.querySelectorAll('tr');
      expect(orderRows.length).toBe(orders.length + 1); // +1 for the header row

      // Check the rendered order data
      orders.forEach((order, index) => {
        const row = orderRows[index + 1]; // +1 to skip the header row
        expect(row.cells[0].textContent).toContain(order._id);
        expect(row.cells[1].textContent).toContain(order.user);
        expect(row.cells[2].textContent).toContain(order.status);
      });
    });

    it('should handle empty order list', () => {
      const emptyOrders: Order[] = [];
      orderServiceMock.getAllOrders.mockReturnValue(of(emptyOrders));

      component.ngOnInit();

      expect(orderServiceMock.getAllOrders).toHaveBeenCalled();
      expect(component.orders).toEqual(emptyOrders);
    });

    it('should handle unexpected error during initialization', () => {
      const errorMessage = 'An unexpected error occurred';
      orderServiceMock.getAllOrders.mockReturnValue(throwError(errorMessage));

      console.error = jest.fn(); // Mock console.error to prevent actual logging

      component.ngOnInit();

      expect(orderServiceMock.getAllOrders).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error fetching all orders:', errorMessage);
      expect(component.orders).toEqual([]);
    });
  });
});
