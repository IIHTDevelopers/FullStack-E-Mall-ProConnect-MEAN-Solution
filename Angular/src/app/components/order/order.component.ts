import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders(): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.orderService.getUserOrders(userId).subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error: any) => {
        console.error('Error fetching user orders:', error);
      }
    );
  }

  cancelOrder(order: Order): void {
    this.orderService.cancelOrder(order._id ?? '0').subscribe(
      () => {
        console.log('Order canceled successfully');
        this.loadUserOrders();
      },
      (error: any) => {
        console.error('Error canceling order:', error);
      }
    );
  }
}
