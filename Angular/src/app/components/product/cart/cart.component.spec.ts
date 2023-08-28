import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { ProductService } from '../../../services/product.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productService: ProductService;

  const productServiceMock = {
    viewCart: jest.fn().mockReturnValue(of()),
    removeCartItem: jest.fn().mockReturnValue(of()),
    updateCartItem: jest.fn().mockReturnValue(of()),
    checkoutCart: jest.fn().mockReturnValue(of())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load cart on init', () => {
      const cartMock = {
        _id: 'cartId',
        userId: 'userId',
        completed: false,
        createdAt: '2023-08-27T12:34:56Z',
        items: []
      };
      productServiceMock.viewCart.mockReturnValue(of(cartMock));
      component.ngOnInit();
      expect(productServiceMock.viewCart).toHaveBeenCalledWith('64d3038b7bd058cd651357ef');
      expect(component.cart).toEqual(cartMock);
    });

    it('should remove an item', () => {
      const itemId = 'item123';
      productServiceMock.removeCartItem.mockReturnValue(of());
      component.removeItem(itemId);
      expect(productServiceMock.removeCartItem).toHaveBeenCalledWith('64d3038b7bd058cd651357ef', itemId);
    });

    it('should increase quantity of an item', () => {
      const item: any = { _id: 'item123', quantity: 3 };
      productServiceMock.updateCartItem.mockReturnValue(of());
      component.increaseQuantity(item);
      expect(productServiceMock.updateCartItem).toHaveBeenCalledWith(
        '64d3038b7bd058cd651357ef',
        item._id,
        item.quantity + 1
      );
    });

    it('should decrease quantity of an item', () => {
      const item: any = { _id: 'item123', quantity: 3 };
      productServiceMock.updateCartItem.mockReturnValue(of());
      component.decreaseQuantity(item);
      expect(productServiceMock.updateCartItem).toHaveBeenCalledWith(
        '64d3038b7bd058cd651357ef',
        item._id,
        item.quantity - 1
      );
    });

    it('should remove an item when decreasing quantity to 0', () => {
      const item: any = { _id: 'item123', quantity: 1 };
      productServiceMock.removeCartItem.mockReturnValue(of());
      component.decreaseQuantity(item);
      expect(productServiceMock.removeCartItem).toHaveBeenCalledWith(
        '64d3038b7bd058cd651357ef',
        item._id
      );
    });

    it('should submit checkout form', () => {
      component.paymentBy = 'Credit Card';
      component.shippingAddress = '123 Main St';
      productServiceMock.checkoutCart.mockReturnValue(of());
      component.submitCheckoutForm();
      expect(productServiceMock.checkoutCart).toHaveBeenCalledWith(
        '64d3038b7bd058cd651357ef',
        'Credit Card',
        '123 Main St'
      );
    });

    it('should show checkout form and calculate total amount', () => {
      component.cart = {
        _id: 'cartId',
        userId: 'userId',
        completed: false,
        createdAt: '2023-08-27T12:34:56Z',
        items: [
          {
            product: {
              price: 10,
              _id: '',
              name: '',
              description: '',
              ratings: [],
              __v: 0
            }, quantity: 2, _id: 'item1'
          },
          {
            product: {
              price: 20,
              _id: '',
              name: '',
              description: '',
              ratings: [],
              __v: 0
            }, quantity: 3, _id: 'item2'
          }
        ]
      };
      component.checkoutCart();
      expect(component.showCheckoutForm).toBe(true);
      expect(component.totalAmount).toEqual(10 * 2 + 20 * 3);
    });
  });
});
