import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

export interface CartItem {
  _id: string;
  userId: string;
  completed: boolean;
  createdAt: string;
  items: CartItemDetail[];
}

export interface CartItemDetail {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number[];
  __v: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem | null = null;
  showCheckoutForm: boolean = false;
  paymentBy: string = '';
  shippingAddress: string = '';
  trackingNumber: string = this.generateTrackingNumber();
  estimatedDeliveryDate: string = this.calculateEstimatedDeliveryDate();
  totalAmount: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.productService.viewCart(userId).subscribe(
      (cart: CartItem) => {
        this.cart = cart;
      },
      (error: any) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  removeItem(itemId: string): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.productService.removeCartItem(userId, itemId).subscribe(
      () => {
        console.log('Item removed successfully');
        this.loadCart();
      },
      (error: any) => {
        console.error('Error removing item:', error);
      }
    );
  }

  increaseQuantity(item: CartItemDetail): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.productService.updateCartItem(userId, item._id, item.quantity + 1).subscribe(
      () => {
        console.log('Quantity increased');
        this.loadCart();
      },
      (error: any) => {
        console.error('Error updating quantity:', error);
      }
    );
  }

  decreaseQuantity(item: CartItemDetail): void {
    const userId = '64d3038b7bd058cd651357ef';
    if (item.quantity > 1) {
      this.productService.updateCartItem(userId, item._id, item.quantity - 1).subscribe(
        () => {
          console.log('Quantity decreased');
          this.loadCart();
        },
        (error: any) => {
          console.error('Error updating quantity:', error);
        }
      );
    } else if (item.quantity === 1) {
      this.productService.removeCartItem(userId, item._id).subscribe(
        () => {
          console.log('Item removed successfully');
          this.loadCart();
        },
        (error: any) => {
          console.error('Error removing item:', error);
        }
      );
    }
  }

  submitCheckoutForm(): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.productService.checkoutCart(userId, this.paymentBy, this.shippingAddress).subscribe(
      () => {
        this.loadCart();
        this.showCheckoutForm = false;
      },
      (error: any) => {
        console.error('Error checking out cart:', error);
      }
    );
  }

  checkoutCart(): void {
    this.showCheckoutForm = true;
    this.calculateTotalAmount();
  }

  generateTrackingNumber(): string {
    const trackingNumber = Math.floor(Math.random() * 65536).toString(16).toUpperCase();
    return trackingNumber.padStart(5, '0');
  }

  calculateEstimatedDeliveryDate(): string {
    const today = new Date();
    const seventhDay = new Date(today);
    seventhDay.setDate(today.getDate() + 7);
    return seventhDay.toDateString();
  }

  calculateTotalAmount(): void {
    if (this.cart) {
      this.totalAmount = this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  }
}
