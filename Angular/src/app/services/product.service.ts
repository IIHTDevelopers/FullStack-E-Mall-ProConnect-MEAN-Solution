import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private baseUrl = 'http://127.0.0.1:8081/api/products';

    constructor(private http: HttpClient) { }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}/create`, product);
    }

    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }

    updateProduct(id: string, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
    }

    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(`${this.baseUrl}/${id}`);
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/all`);
    }

    getTopRatedProducts(limit: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/top-rated/${limit}`);
    }

    searchProduct(name: string, description: string): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/search`, {
            params: { name, description }
        });
    }

    applyDiscount(userId: string, discountPercentage: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/discount/${userId}`, {
            discountPercentage
        });
    }

    checkoutCart(userId: string, paymentMethod: string, address: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/cart/checkout/${userId}`, {
            paymentMethod, address
        });
    }

    addToCart(userId: string, productId: string, quantity: number, price: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/cart/add/${userId}`, {
            productId,
            quantity,
            price
        });
    }

    viewCart(userId: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/cart/${userId}`);
    }

    updateCartItem(userId: string, itemId: string, quantity: number): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/cart/update/${userId}/${itemId}`, {
            quantity
        });
    }

    removeCartItem(userId: string, itemId: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/cart/remove/${userId}/${itemId}`);
    }
}
