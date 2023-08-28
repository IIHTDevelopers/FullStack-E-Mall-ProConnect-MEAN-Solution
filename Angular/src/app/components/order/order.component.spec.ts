import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderComponent } from './order.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let orderService: OrderService;

  const orderServiceMock = {
    getUserOrders: jest.fn().mockReturnValue(of([])),
    cancelOrder: jest.fn().mockReturnValue(of())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [{ provide: OrderService, useValue: orderServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load user orders on init', () => {
      const userOrdersMock: Order[] = [
        {
          _id: 'order1',
          user: 'userId',
          products: [],
          status: 'Pending',
          totalAmount: 100,
          paymentDetails: {
            paymentMethod: 'Credit Card',
            transactionId: 'transaction123',
            timestamp: new Date()
          },
          shipmentDetails: {
            address: '123 Main St',
            trackingNumber: 'tracking123',
            estimatedDelivery: new Date()
          }
        }
      ];
      orderServiceMock.getUserOrders.mockReturnValue(of(userOrdersMock));
      component.ngOnInit();
      expect(orderServiceMock.getUserOrders).toHaveBeenCalledWith('64d3038b7bd058cd651357ef');
      expect(component.orders).toEqual(userOrdersMock);
    });

    it('should cancel an order', () => {
      const orderMock: Order = {
        _id: 'order1',
        user: 'userId',
        products: [],
        status: 'Pending',
        totalAmount: 100,
        paymentDetails: {
          paymentMethod: 'Credit Card',
          transactionId: 'transaction123',
          timestamp: new Date()
        },
        shipmentDetails: {
          address: '123 Main St',
          trackingNumber: 'tracking123',
          estimatedDelivery: new Date()
        }
      };
      orderServiceMock.cancelOrder.mockReturnValue(of());
      component.cancelOrder(orderMock);
      expect(orderServiceMock.cancelOrder).toHaveBeenCalledWith('order1');
    });

    it('should not cancel an order with status other than "Pending"', () => {
      const loadUserOrdersSpy = jest.spyOn(component, 'loadUserOrders');
      const orderMock: Order = {
        _id: 'order1',
        user: 'userId',
        products: [],
        status: 'Shipped',
        totalAmount: 100,
        paymentDetails: {
          paymentMethod: 'Credit Card',
          transactionId: 'transaction123',
          timestamp: new Date()
        },
        shipmentDetails: {
          address: '123 Main St',
          trackingNumber: 'tracking123',
          estimatedDelivery: new Date()
        }
      };
      orderServiceMock.cancelOrder.mockReturnValue(of());
      component.cancelOrder(orderMock);
      expect(orderServiceMock.cancelOrder).toHaveBeenCalledWith(orderMock._id);
      expect(loadUserOrdersSpy).not.toHaveBeenCalled();
    });
  });
});