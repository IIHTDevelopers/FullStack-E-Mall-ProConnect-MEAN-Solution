import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://127.0.0.1:8081/api/admin';

    constructor(private http: HttpClient) { }

    viewAllUsers(): any {
        return this.http.get<any>(`${this.baseUrl}/users`);
    }

    viewAllProducts(): any {
        return this.http.get<any>(`${this.baseUrl}/products`);
    }

    viewAllOrders(): any {
        return this.http.get<any>(`${this.baseUrl}/orders`);
    }

    viewAllBlogPosts(): any {
        return this.http.get<any>(`${this.baseUrl}/blogs`);
    }

    viewDashboard(): any {
        return this.http.get<any>(`${this.baseUrl}/dashboard`);
    }

    viewReports(): any {
        return this.http.get<any>(`${this.baseUrl}/reports`);
    }

    viewUserAnalytics(): any {
        return this.http.get<any>(`${this.baseUrl}/reports/sales`); // Update with correct endpoint
    }

    viewProductInventory(): any {
        return this.http.get<any>(`${this.baseUrl}/products/inventory`); // Update with correct endpoint
    }

    viewSalesReports(): any {
        return this.http.get<any>(`${this.baseUrl}/orders/analytics`); // Update with correct endpoint
    }
}
