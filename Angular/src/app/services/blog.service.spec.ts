import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import { Blog } from '../models/blog.model';

describe('BlogService', () => {
    let blogService: BlogService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/blogs';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BlogService]
        });

        blogService = TestBed.inject(BlogService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(blogService).toBeTruthy();
        });

        it('should create a blog', () => {
            const mockBlog: Blog = {
                id: '1', title: 'Blog 1', content: 'Content 1',
                product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            blogService.createBlog(mockBlog).subscribe((createdBlog: Blog) => {
                expect(createdBlog).toEqual(mockBlog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/create`);
            expect(req.request.method).toBe('POST');
            req.flush(mockBlog);
        });

        it('should fetch a blog by ID', () => {
            const mockBlog: Blog = {
                id: '1', title: 'Blog 1', content: 'Content 1',
                product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            blogService.getBlog(mockBlog.id).subscribe((fetchedBlog: Blog) => {
                expect(fetchedBlog).toEqual(mockBlog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlog.id}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockBlog);
        });

        it('should update a blog', () => {
            const mockBlog: Blog = {
                id: '1', title: 'Blog 1', content: 'Content 1',
                product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            const updatedMockBlog: Blog = { ...mockBlog, content: 'Updated content' };
            blogService.updateBlog(mockBlog.id, updatedMockBlog).subscribe((updatedBlog: Blog) => {
                expect(updatedBlog).toEqual(updatedMockBlog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlog.id}`);
            expect(req.request.method).toBe('PUT');
            req.flush(updatedMockBlog);
        });

        it('should delete a blog', () => {
            const mockBlog: Blog = {
                id: '1', title: 'Blog 1', content: 'Content 1',
                product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            blogService.deleteBlog(mockBlog.id).subscribe((deletedBlog: Blog) => {
                expect(deletedBlog).toEqual(mockBlog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlog.id}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockBlog);
        });

        it('should fetch all blogs', () => {
            const mockBlogs: Blog[] = [{
                id: '1', title: 'Blog 1', content: 'Content 1', product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            }, {
                id: '2', title: 'Blog 2', content: 'Content 2', product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            }];
            blogService.getAllBlogs().subscribe((blogs: Blog[]) => {
                expect(blogs).toEqual(mockBlogs);
            });
            const req = httpTestingController.expectOne(`${baseURL}/all`);
            expect(req.request.method).toBe('GET');
            req.flush(mockBlogs);
        });

        it('should fetch popular blogs', () => {
            const mockPopularBlogs: Blog[] = [
                {
                    id: '1',
                    title: 'Popular Blog 1',
                    content: 'Content 1',
                    product: '',
                    author: {
                        _id: 'string',
                        username: 'string'
                    },
                    comments: [],
                    likes: [],
                },
                {
                    id: '2',
                    title: 'Popular Blog 2',
                    content: 'Content 2',
                    product: '',
                    author: {
                        _id: 'string',
                        username: 'string'
                    },
                    comments: [],
                    likes: [],
                }
            ];
            blogService.getPopularBlogs().subscribe((popularBlogs: Blog[]) => {
                expect(popularBlogs).toEqual(mockPopularBlogs);
            });
            const req = httpTestingController.expectOne(`${baseURL}/popular`);
            expect(req.request.method).toBe('GET');
            req.flush(mockPopularBlogs);
        });

        it('should add a comment', () => {
            const mockBlogId = '1';
            const mockComment = { text: 'This is a comment' };
            blogService.addComment(mockBlogId, mockComment).subscribe((updatedBlog: Blog) => {
                expect(updatedBlog.comments).toContain(mockComment);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlogId}/comments`);
            expect(req.request.method).toBe('POST');
            req.flush({ ...mockComment });
        });

        it('should edit a comment', () => {
            const mockBlogId = '1';
            const mockCommentId = '2';
            const updatedComment = { text: 'Updated comment' };
            blogService.editComment(mockBlogId, mockCommentId, updatedComment).subscribe((updatedBlog: Blog) => {
                // Write your assertions here
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlogId}/comments/${mockCommentId}`);
            expect(req.request.method).toBe('PUT');
            req.flush({ ...updatedComment });
        });

        it('should delete a comment', () => {
            const mockBlogId = '1';
            const mockCommentId = '2';
            const mockBlogWithDeletedComment: Blog = {
                id: '1',
                title: 'Blog 1',
                content: 'Content 1',
                product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            blogService.deleteComment(mockBlogId, mockCommentId).subscribe((updatedBlog: Blog) => {
                expect(updatedBlog).toEqual(mockBlogWithDeletedComment);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlogId}/comments/${mockCommentId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockBlogWithDeletedComment);
        });

        it('should fetch categories', () => {
            const mockCategories: string[] = ['Category 1', 'Category 2'];
            blogService.getCategories().subscribe((categories: string[]) => {
                expect(categories).toEqual(mockCategories);
            });
            const req = httpTestingController.expectOne(`${baseURL}/categories`);
            expect(req.request.method).toBe('GET');
            req.flush(mockCategories);
        });

        it('should like a blog', () => {
            const mockBlogId = '1';
            blogService.likeBlog(mockBlogId).subscribe((updatedBlog: Blog) => {
                // Write your assertions here
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlogId}/like`);
            expect(req.request.method).toBe('PUT');
            req.flush({});
        });

        it('should fetch comment count', () => {
            const mockBlogId = '1';
            const mockCommentCount = 5;
            blogService.getCommentCount(mockBlogId).subscribe((count: number) => {
                expect(count).toEqual(mockCommentCount);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockBlogId}/comments/count`);
            expect(req.request.method).toBe('GET');
            req.flush(mockCommentCount);
        });

        it('should fetch blog by product', () => {
            const mockProductId = '123';
            const mockBlog: Blog = {
                id: '1', title: 'Blog 1', content: 'Content 1', product: '',
                author: {
                    _id: 'string',
                    username: 'string'
                },
                comments: [],
                likes: [],
            };
            blogService.getBlogByProduct(mockProductId).subscribe((fetchedBlog: Blog) => {
                expect(fetchedBlog).toEqual(mockBlog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/product/${mockProductId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockBlog);
        });
    });
});
