import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private baseUrl = 'http://127.0.0.1:8081/api/blogs';

    constructor(private http: HttpClient) { }

    createBlog(blog: Blog): any {
        return this.http.post<Blog>(`${this.baseUrl}/create`, blog);
    }

    getBlog(id: string): any {
        return this.http.get<Blog>(`${this.baseUrl}/${id}`);
    }

    updateBlog(id: string, blog: Blog): any {
        return this.http.put<Blog>(`${this.baseUrl}/${id}`, blog);
    }

    deleteBlog(id: string): any {
        return this.http.delete<Blog>(`${this.baseUrl}/${id}`);
    }

    getAllBlogs(): any {
        return this.http.get<Blog[]>(`${this.baseUrl}/all`);
    }

    getPopularBlogs(): any {
        return this.http.get<Blog[]>(`${this.baseUrl}/popular`);
    }

    addComment(blogId: string, comment: any): any {
        return this.http.post<Blog>(`${this.baseUrl}/${blogId}/comments`, comment);
    }

    editComment(blogId: string, commentId: string, updatedComment: any): any {
        return this.http.put<Blog>(`${this.baseUrl}/${blogId}/comments/${commentId}`, { updatedComment });
    }

    deleteComment(blogId: string, commentId: string): any {
        return this.http.delete<Blog>(`${this.baseUrl}/${blogId}/comments/${commentId}`);
    }

    getCategories(): any {
        return this.http.get<string[]>(`${this.baseUrl}/categories`);
    }

    likeBlog(blogId: string): any {
        return this.http.put<Blog>(`${this.baseUrl}/${blogId}/like`, {});
    }

    getCommentCount(blogId: string): any {
        return this.http.get<number>(`${this.baseUrl}/${blogId}/comments/count`);
    }

    getBlogByProduct(productId: string): any {
        return this.http.get<Blog>(`${this.baseUrl}/product/` + productId);
    }
}
