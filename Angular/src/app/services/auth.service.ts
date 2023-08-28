import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://127.0.0.1:8081/api/users';

    private token: string | null = null;

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
            .subscribe(response => {
                this.token = response.token;
                localStorage.setItem('token', this.token ?? response.token);
                this.router.navigate(['/']);
            });
    }

    getToken(): string | null {
        return this.token || localStorage.getItem('token');
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
    }
}
