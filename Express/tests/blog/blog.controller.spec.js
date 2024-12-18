const request = require('supertest');
const express = require('express');
const router = require('../../modules/blog/routes/blogs.routes');

const BlogController = require('../../modules/blog/controller/blog.controller');
const BlogServiceImpl = require('../../modules/blog/service/impl/blog.serviceImpl');

const authMiddleware = require('../../modules/middleware/authUserMiddleware');
const adminMiddleware = require('../../modules/middleware/authAdminMiddleware');

const app = express();
app.use(express.json());
app.use(authMiddleware);
app.use(adminMiddleware);
app.use(router);

jest.mock('../../modules/blog/service/impl/blog.serviceImpl');

let blogControllerBoundaryTest = `BlogController boundary test`;

describe('Blog Controller', () => {
    describe('boundary', () => {
        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access post /create protected routes without a token`, async () => {
            const response = await request(app).post('/create');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access put /:id protected routes without a token`, async () => {
            const response = await request(app).put('/1234');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id protected routes without a token`, async () => {
            const response = await request(app).delete('/1234');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access post /:id/comments protected routes without a token`, async () => {
            const response = await request(app).post('/1234/comments');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access put /:id/comments/:commentId protected routes without a token`, async () => {
            const response = await request(app).put('/1234/comments/45678');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access delete /:id/comments/:commentId protected routes without a token`, async () => {
            const response = await request(app).delete('/1234/comments/45678');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should return 401 Unauthorized when trying to access put/ :id/like protected routes without a token`, async () => {
            const response = await request(app).put('/1234/like');
            expect(response.status).toBe(401);
        });

        it(`${blogControllerBoundaryTest} should create a new blog post`, async () => {
            const mReq = {
                body: {
                    title: 'New Blog Post',
                    content: 'This is the content of the blog post.',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockBlog = {
                _id: 'mockBlogId',
                ...mReq.body,
            };

            BlogServiceImpl.prototype.createBlog.mockResolvedValueOnce(mockBlog);

            await new BlogController().createBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.createBlog).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should retrieve a blog post by ID`, async () => {
            const blogId = 'mockBlogId';
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.getBlog.mockResolvedValueOnce(mockBlog);

            await new BlogController().getBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.getBlog).toHaveBeenCalledWith(blogId);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should update a blog post by ID`, async () => {
            const blogId = 'mockBlogId';
            const updatedBlogData = {
                title: 'Updated Blog Post',
                content: 'This is the updated content of the blog post.',
            };
            const updatedBlog = {
                _id: blogId,
                ...updatedBlogData,
            };

            const mReq = {
                params: { id: blogId },
                body: updatedBlogData,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.updateBlog.mockResolvedValueOnce(updatedBlog);

            await new BlogController().updateBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.updateBlog).toHaveBeenCalledWith(blogId, updatedBlogData);
            expect(mRes.json).toHaveBeenCalledWith(updatedBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should delete a blog post by ID`, async () => {
            const blogId = 'mockBlogId';
            const deletedBlog = {
                _id: blogId,
                title: 'Deleted Blog Post',
                content: 'This is the content of the deleted blog post.',
            };

            const mReq = {
                params: { id: blogId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.deleteBlog.mockResolvedValueOnce(deletedBlog);

            await new BlogController().deleteBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.deleteBlog).toHaveBeenCalledWith(blogId);
            expect(mRes.json).toHaveBeenCalledWith(deletedBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should return a 404 error when getting a blog post with invalid ID`, async () => {
            const blogId = 'invalidBlogId';

            const mReq = {
                params: { id: blogId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.getBlog.mockRejectedValueOnce(new Error('Blog post not found.'));

            await new BlogController().getBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.getBlog).toHaveBeenCalledWith(blogId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Blog post not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should return a 404 error when updating a blog post with invalid ID`, async () => {
            const blogId = 'invalidBlogId';
            const updatedBlogData = {
                title: 'Updated Blog Post',
                content: 'This is the updated content of the blog post.',
            };

            const mReq = {
                params: { id: blogId },
                body: updatedBlogData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.updateBlog.mockRejectedValueOnce(new Error('Blog post not found.'));

            await new BlogController().updateBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.updateBlog).toHaveBeenCalledWith(blogId, updatedBlogData);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Blog post not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });
        
        it(`${blogControllerBoundaryTest} should return a 500 error when creating a blog post fails`, async () => {
            const mReq = {
                body: {
                    title: 'New Blog Post',
                    content: 'This is the content of the blog post.',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to create blog post.');
            BlogServiceImpl.prototype.createBlog.mockRejectedValueOnce(error);

            await new BlogController().createBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.createBlog).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create blog post.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should return a 404 error when deleting a blog post with invalid ID`, async () => {
            const blogId = 'invalidBlogId';

            const mReq = {
                params: { id: blogId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Blog post not found.');
            BlogServiceImpl.prototype.deleteBlog.mockRejectedValueOnce(error);

            await new BlogController().deleteBlog(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.deleteBlog).toHaveBeenCalledWith(blogId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Blog post not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        // it(`${blogControllerBoundaryTest} should update a blog post by ID and return a 404 error when blog post is not found`, async () => {
        //     const blogId = 'mockBlogId';
        //     const updatedBlogData = {
        //         title: 'Updated Blog Post',
        //         content: 'This is the updated content of the blog post.',
        //     };

        //     const mReq = {
        //         params: { id: blogId },
        //         body: updatedBlogData,
        //     };
        //     const mRes = {
        //         json: jest.fn(),
        //     };
        //     const mNext = jest.fn();

        //     const error = new Error('Blog post not found.');
        //     BlogServiceImpl.prototype.updateBlog.mockRejectedValueOnce(error);

        //     await new BlogController().updateBlog(mReq, mRes, mNext);

        //     expect(BlogServiceImpl.prototype.updateBlog).toHaveBeenCalledWith(blogId, updatedBlogData);
        //     expect(mRes.json).not.toHaveBeenCalled();
        //     expect(mNext).toHaveBeenCalledWith(error);
        // });

        it(`${blogControllerBoundaryTest} should add a comment to a blog post`, async () => {
            const blogId = 'mockBlogId';
            const comment = {
                content: 'This is a comment.',
                timestamp: new Date(),
                user: 'user_id',
            };
            const mReq = {
                params: { id: blogId },
                body: comment,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            // Mock the initial state of the blog before adding a comment
            const mockBlog = {
                _id: blogId,
                title: 'Mock Blog Title',
                content: 'Mock Blog Content',
                comments: [], // Start with an empty comments array
            };

            // Mock the updated state of the blog after adding the comment
            const mockUpdatedBlog = {
                ...mockBlog,
                comments: [...mockBlog.comments, comment], // Add the new comment
            };

            // Mock the behavior of the getBlog and addComment methods
            BlogServiceImpl.prototype.getBlog.mockResolvedValueOnce(mockBlog);
            BlogServiceImpl.prototype.addComment.mockResolvedValueOnce(mockUpdatedBlog);

            // Call the controller method to add a comment
            await new BlogController().addComment(mReq, mRes, mNext);

            // Check that the methods were called with the expected arguments
            // expect(BlogServiceImpl.prototype.getBlog).toHaveBeenCalledWith(blogId);
            // expect(BlogServiceImpl.prototype.addComment).toHaveBeenCalledWith(blogId, comment);

            // Check that the response was sent with the updated blog containing the new comment
            expect(mRes.json).toHaveBeenCalledWith(mockUpdatedBlog);

            // Check that mNext was not called (indicating no error)
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should edit a comment on a blog post`, async () => {
            const blogId = 'mockBlogId';
            const commentId = 'mockCommentId';
            const updatedComment = 'This is an updated comment.';
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId, commentId: commentId },
                body: { text: updatedComment },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.editComment.mockResolvedValueOnce(mockBlog);

            await new BlogController().editComment(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.editComment).toHaveBeenCalledWith(blogId, commentId, updatedComment);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should delete a comment on a blog post`, async () => {
            const blogId = 'mockBlogId';
            const commentId = 'mockCommentId';
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId, commentId: commentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.deleteComment.mockResolvedValueOnce(mockBlog);

            await new BlogController().deleteComment(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.deleteComment).toHaveBeenCalledWith(blogId, commentId);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should get a list of all blog categories`, async () => {
            const categories = ['Technology', 'Travel', 'Food'];
            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.getCategories.mockResolvedValueOnce(categories);

            await new BlogController().getCategories(mReq, mRes, mNext);

            expect(BlogServiceImpl.prototype.getCategories).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(categories);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should get the comment count of a blog post`, async () => {
            const blogId = 'mockBlogId';
            const commentCount = 5;
            const mReq = {
                params: { id: blogId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.getCommentCount.mockResolvedValueOnce({ commentCount });

            await new BlogController().getCommentCount(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.getCommentCount).toHaveBeenCalledWith(blogId);
            expect(mRes.json).toHaveBeenCalledWith({ commentCount });
            expect(mNext).not.toHaveBeenCalled();
        });


        it(`${blogControllerBoundaryTest} should add a comment to a blog post`, async () => {
            const blogId = 'mockBlogId';
            const comment = {
                user: 'user_id',
                content: 'This is a comment.',
                timestamp: new Date(),
            };
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId },
                body: comment,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.addComment.mockResolvedValueOnce(mockBlog);

            await new BlogController().addComment(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.addComment).toHaveBeenCalledWith(blogId, comment);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should edit a comment on a blog post`, async () => {
            const blogId = 'mockBlogId';
            const commentId = 'mockCommentId';
            const updatedComment = 'This is an updated comment.';
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId, commentId: commentId },
                body: { text: updatedComment },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.editComment.mockResolvedValueOnce(mockBlog);

            await new BlogController().editComment(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.editComment).toHaveBeenCalledWith(blogId, commentId, updatedComment);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${blogControllerBoundaryTest} should delete a comment on a blog post`, async () => {
            const blogId = 'mockBlogId';
            const commentId = 'mockCommentId';
            const mockBlog = {
                _id: blogId,
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };

            const mReq = {
                params: { id: blogId, commentId: commentId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            BlogServiceImpl.prototype.deleteComment.mockResolvedValueOnce(mockBlog);

            await new BlogController().deleteComment(mReq, mRes, mNext);

            // expect(BlogServiceImpl.prototype.deleteComment).toHaveBeenCalledWith(blogId, commentId);
            expect(mRes.json).toHaveBeenCalledWith(mockBlog);
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
