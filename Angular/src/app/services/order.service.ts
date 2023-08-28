import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private baseUrl = 'http://127.0.0.1:8081/api/orders';

    constructor(private http: HttpClient) { }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.baseUrl}/all`);
    }

    createOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${this.baseUrl}/create`, order);
    }

    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.baseUrl}/${id}`);
    }

    updateOrder(id: string, order: Order): Observable<Order> {
        return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
    }

    getUserOrders(userId: string): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
    }

    cancelOrder(id: string): Observable<Order> {
        return this.http.delete<Order>(`${this.baseUrl}/cancel/${id}`);
    }

    getPaymentDetails(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}/payment`);
    }

    processPayment(id: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${id}/pay`, {});
    }

    getOrderAnalytics(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/analytics`);
    }

    generateInvoice(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}/invoice`);
    }

    trackShipment(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}/shipment`);
    }

    getRevenueAnalytics(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/revenue`);
    }

    getIsOrdered(userId: string, productId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/ordered/${userId}/${productId}`);
    }
}
