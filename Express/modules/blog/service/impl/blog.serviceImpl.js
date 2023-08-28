const Blog = require('../../dao/models/blog.model');
const BlogService = require('../blog.service');

class BlogServiceImpl extends BlogService {
    async createBlog(blogData) {
        try {
            const blog = await Blog.create(blogData);
            return blog;
        } catch (error) {
            throw new Error('Failed to create blog post.');
        }
    }

    async getBlog(blogId) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            return blog;
        } catch (error) {
            throw new Error('Failed to get blog post.');
        }
    }

    async updateBlog(blogId, updatedBlog) {
        try {
            const blog = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true });
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            return blog;
        } catch (error) {
            throw new Error('Failed to update blog post.');
        }
    }

    async deleteBlog(blogId) {
        try {
            const blog = await Blog.findByIdAndDelete(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            return blog;
        } catch (error) {
            throw new Error('Failed to delete blog post.');
        }
    }

    async getAllBlogs() {
        try {
            const blogs = await Blog.find();
            return blogs;
        } catch (error) {
            throw new Error('Failed to get list of blog posts.');
        }
    }

    async getPopularBlogs() {
        try {
            const popularBlogs = await Blog.find().sort({ likes: -1 }).limit(5);
            return popularBlogs;
        } catch (error) {
            throw new Error('Failed to get popular blog posts.');
        }
    }

    async addComment(blogId, comment) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            blog.comments.push(comment);
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error('Failed to add comment.');
        }
    }

    async editComment(blogId, commentId, updatedComment) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);
            if (commentIndex === -1) {
                throw new Error('Comment not found.');
            }
            blog.comments[commentIndex].text = updatedComment;
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error('Failed to edit comment.');
        }
    }

    async deleteComment(blogId, commentId) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            const commentIndex = blog.comments.findIndex(comment => comment._id.toString() === commentId);
            if (commentIndex === -1) {
                throw new Error('Comment not found.');
            }
            blog.comments.splice(commentIndex, 1);
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error('Failed to delete comment.');
        }
    }

    async getCategories() {
        try {
            const categories = await Blog.distinct('categories');
            return categories;
        } catch (error) {
            throw new Error('Failed to get blog categories.');
        }
    }

    async likeBlog(blogId) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            blog.likes++;
            await blog.save();
            return blog;
        } catch (error) {
            throw new Error('Failed to like blog post.');
        }
    }

    async getCommentCount(blogId) {
        try {
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new Error('Blog post not found.');
            }
            const commentCount = blog.comments.length;
            return { commentCount };
        } catch (error) {
            throw new Error('Failed to get comment count.');
        }
    }

    async getBlogByProduct(productId) {
        try {
            const blog = await Blog.findOne({ product: productId })
                .populate('author', 'username')
                .populate('comments.user', 'username')
                .populate('product', 'name price');

            return blog;
        } catch (error) {
            console.error('Error fetching blog:', error);
            throw error;
        }
    }
}

module.exports = BlogServiceImpl;
