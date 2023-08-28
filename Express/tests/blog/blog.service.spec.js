const mongoose = require('mongoose');
const BlogServiceImpl = require('../../modules/blog/service/impl/blog.serviceImpl');
const Blog = require('../../modules/blog/dao/models/blog.model');
const User = require('../../modules/user/dao/models/user.model');

jest.mock('../../modules/blog/dao/models/blog.model');
jest.mock('../../modules/user/dao/models/user.model');

let blogServiceBoundaryTest = `BlogService functional test`;

describe('Blog Service', () => {
    let blogService;

    beforeEach(() => {
        blogService = new BlogServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${blogServiceBoundaryTest} should create a new blog post`, async () => {
            const blogData = {
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };
            Blog.create.mockResolvedValue(blogData);

            const result = await blogService.createBlog(blogData);
            expect(result).toEqual(blogData);
        });

        it(`${blogServiceBoundaryTest} should get blog post by ID`, async () => {
            const blogId = 'blog_id';
            const blog = { _id: blogId, title: 'New Blog Post' };
            Blog.findById.mockResolvedValue(blog);

            const result = await blogService.getBlog(blogId);
            expect(result).toEqual(blog);
        });

        it(`${blogServiceBoundaryTest} should update blog post by ID`, async () => {
            const blogId = 'blog_id';
            const updatedBlogData = {
                title: 'Updated Blog Post',
                content: 'This is the updated content of the blog post.',
            };
            const updatedBlog = { _id: blogId, ...updatedBlogData };
            Blog.findByIdAndUpdate.mockResolvedValue(updatedBlog);

            const result = await blogService.updateBlog(blogId, updatedBlogData);
            expect(result).toEqual(updatedBlog);
        });

        it(`${blogServiceBoundaryTest} should delete blog post by ID`, async () => {
            const blogId = 'blog_id';
            const deletedBlog = {
                _id: blogId,
                title: 'Deleted Blog Post',
                content: 'This is the content of the deleted blog post.',
            };
            Blog.findByIdAndDelete.mockResolvedValue(deletedBlog);

            const result = await blogService.deleteBlog(blogId);
            expect(result).toEqual(deletedBlog);
        });

        it(`${blogServiceBoundaryTest} should throw an error when blog post is not found for getBlog`, async () => {
            const blogId = 'non_existing_id';
            Blog.findById.mockResolvedValue(null);
            await expect(blogService.getBlog(blogId)).rejects.toThrow('Failed to get blog post.');
        });

        it(`${blogServiceBoundaryTest} should throw an error when blog post is not found for updateBlog`, async () => {
            const blogId = 'non_existing_id';
            const updatedBlogData = {
                title: 'Updated Blog Post',
                content: 'This is the updated content of the blog post.',
            };
            Blog.findByIdAndUpdate.mockResolvedValue(null);
            await expect(blogService.updateBlog(blogId, updatedBlogData)).rejects.toThrow('Failed to update blog post.');
        });

        it(`${blogServiceBoundaryTest} should throw an error when blog post is not found for deleteBlog`, async () => {
            const blogId = 'non_existing_id';
            Blog.findByIdAndDelete.mockResolvedValue(null);
            await expect(blogService.deleteBlog(blogId)).rejects.toThrow('Failed to delete blog post.');
        });

        it(`${blogServiceBoundaryTest} should throw an error when failing to create a blog post`, async () => {
            const blogData = {
                title: 'New Blog Post',
                content: 'This is the content of the blog post.',
            };
            const error = new Error('Failed to create blog post.');
            Blog.create.mockRejectedValue(error);
            await expect(blogService.createBlog(blogData)).rejects.toThrow(error);
        });

        it(`${blogServiceBoundaryTest} should throw an error when failing to update a blog post by ID`, async () => {
            const blogId = 'non_existing_id';
            const updatedBlogData = {
                title: 'Updated Blog Post',
                content: 'This is the updated content of the blog post.',
            };
            const error = new Error('Failed to update blog post.');
            Blog.findByIdAndUpdate.mockRejectedValue(error);
            await expect(blogService.updateBlog(blogId, updatedBlogData)).rejects.toThrow(error);
        });

        it(`${blogServiceBoundaryTest} should throw an error when failing to delete a blog post by ID`, async () => {
            const blogId = 'non_existing_id';
            const error = new Error('Failed to delete blog post.');
            Blog.findByIdAndDelete.mockRejectedValue(error);
            await expect(blogService.deleteBlog(blogId)).rejects.toThrow(error);
        });

        it(`${blogServiceBoundaryTest} should get list of all blog posts`, async () => {
            const blogs = [
                { _id: 'blog_id_1', title: 'Blog Post 1' },
                { _id: 'blog_id_2', title: 'Blog Post 2' },
            ];
            Blog.find.mockResolvedValue(blogs);

            const result = await blogService.getAllBlogs();
            expect(result).toEqual(blogs);
        });

        it(`${blogServiceBoundaryTest} should get popular blog posts`, async () => {
            const popularBlogs = [
                { _id: 'blog_id_1', title: 'Popular Blog 1', likes: 10 },
                { _id: 'blog_id_2', title: 'Popular Blog 2', likes: 8 },
            ];
            Blog.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(popularBlogs),
            });

            const result = await blogService.getPopularBlogs();
            expect(result).toEqual(popularBlogs);
        });

        // it(`${blogServiceBoundaryTest} should add a comment to a blog post`, async () => {
        //     const blogId = 'blog_id';
        //     const comment = { text: 'This is a comment.' };
        //     const blog = { _id: blogId, title: 'Blog Post', comments: [] };
        //     Blog.findById.mockResolvedValue(blog);

        //     const result = await blogService.addComment(blogId, comment);
        //     expect(result.comments).toHaveLength(1);
        //     expect(result.comments[0]).toEqual(comment);
        // });

        // it(`${blogServiceBoundaryTest} should edit a comment on a blog post`, async () => {
        //     const blogId = 'blog_id';
        //     const commentId = 'comment_id';
        //     const updatedComment = 'This is an updated comment.';
        //     const blog = { _id: blogId, title: 'Blog Post', comments: [{ _id: commentId, text: 'Original Comment' }] };
        //     Blog.findById.mockResolvedValue(blog);

        //     const result = await blogService.editComment(blogId, commentId, updatedComment);
        //     expect(result.comments[0].text).toEqual(updatedComment);
        // });

        // it(`${blogServiceBoundaryTest} should delete a comment on a blog post`, async () => {
            
        //     const blogId = mongoose.Types.ObjectId();
        //     const userId = mongoose.Types.ObjectId();
        //     const commentId = mongoose.Types.ObjectId();
            
        //     // Create a mock User
        //     const user = new User({
        //         _id: userId,
        //         username: 'testuser',
        //     });
        //     User.findById = jest.fn().mockResolvedValue(user);
            
        //     // Create a mock Blog
        //     const blog = new Blog({
        //         _id: blogId,
        //         title: 'Test Blog Post',
        //         content: 'This is a test blog post.',
        //         author: userId,
        //         comments: [{ _id: commentId, text: 'Comment' }]
        //     });
        //     Blog.findById.mockResolvedValue(blog);

        //     const result = await blogService.deleteComment(blogId, commentId);
        //     expect(result.comments).toHaveLength(0);
        // });

        it(`${blogServiceBoundaryTest} should get blog categories or tags`, async () => {
            const categories = ['Category 1', 'Category 2'];
            Blog.distinct.mockResolvedValue(categories);

            const result = await blogService.getCategories();
            expect(result).toEqual(categories);
        });

        it(`${blogServiceBoundaryTest} should like a blog post`, async () => {
            const blogId = mongoose.Types.ObjectId();
            const userId = mongoose.Types.ObjectId();

            // Create a mock User
            const user = new User({
                _id: userId,
                username: 'testuser',
            });
            User.findById = jest.fn().mockResolvedValue(user);

            // Create a mock Blog
            const blog = new Blog({
                _id: blogId,
                title: 'Test Blog Post',
                content: 'This is a test blog post.',
                author: userId,
            });
            Blog.findById.mockResolvedValue(blog);
            const result = await blogService.likeBlog(blogId);
            expect(result).toEqual(blog);
        });

        it(`${blogServiceBoundaryTest} should get comment count of a blog post`, async () => {
            const blogId = 'blog_id';
            const blog = { _id: blogId, title: 'Blog Post', comments: [{ _id: 'comment_id' }, { _id: 'comment_id' }] };
            Blog.findById.mockResolvedValue(blog);

            const result = await blogService.getCommentCount(blogId);
            expect(result.commentCount).toBe(blog.comments.length);
        });

        it(`${blogServiceBoundaryTest} should throw an error when failing to get list of blog posts`, async () => {
            const error = new Error('Failed to get list of blog posts.');
            Blog.find.mockRejectedValue(error);
            await expect(blogService.getAllBlogs()).rejects.toThrow(error);
        });
    });
});
