import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://127.0.0.1:8081/api/users';

    constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/create`, user);
    }

    getUserProfile(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    updateUserProfile(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${id}`, user);
    }

    deleteUser(id: string): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/${id}`);
    }

    getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/email/${email}`);
    }

    getUserActivity(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}/activity`);
    }

    getUserFavorites(id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}/favorites`);
    }

    changeUserPassword(id: string, newPassword: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/change-password/${id}`, { newPassword });
    }
}
