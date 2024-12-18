const BlogServiceImpl = require('../service/impl/blog.serviceImpl');

const blogService = new BlogServiceImpl();

class BlogController {
    async createBlog(req, res) {
        try {
            const newBlog = await blogService.createBlog(req.body);
            res.status(201).json(newBlog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create blog post.' });
        }
    };

    async getBlog(req, res) {
        try {
            const blog = await blogService.getBlog(req.params.id);
            res.json(blog);
        } catch (error) {
            res.status(404).json({ error: 'Blog post not found.' });
        }
    };

    async updateBlog(req, res) {
        try {
            const updatedBlog = await blogService.updateBlog(req.params.id, req.body);
            res.json(updatedBlog);
        } catch (error) {
            res.status(404).json({ error: 'Blog post not found.' });
        }
    };

    async deleteBlog(req, res) {
        try {
            const deletedBlog = await blogService.deleteBlog(req.params.id);
            res.json(deletedBlog);
        } catch (error) {
            res.status(404).json({ error: 'Blog post not found.' });
        }
    };

    async getAllBlogs(req, res) {
        try {
            const blogs = await blogService.getAllBlogs();
            res.json(blogs);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get list of blog posts.' });
        }
    };

    async getPopularBlogs(req, res) {
        try {
            const popularBlogs = await blogService.getPopularBlogs();
            res.json(popularBlogs);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get popular blog posts.' });
        }
    };

    async addComment(req, res) {
        try {
            const blogId = req.params.id;
            const comment = {
                content: req.body.content,
                user: req.body.user
            };
            const updatedBlog = await blogService.addComment(blogId, comment);
            res.json(updatedBlog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add comment.' });
        }
    };

    async editComment(req, res) {
        try {
            const { blogId, commentId } = req.params;
            const updatedComment = req.body.updatedComment;
            const updatedBlog = await blogService.editComment(blogId, commentId, updatedComment);
            res.json(updatedBlog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to edit comment.' });
        }
    };

    async deleteComment(req, res) {
        try {
            const { blogId, commentId } = req.params;
            const updatedBlog = await blogService.deleteComment(blogId, commentId);
            res.json(updatedBlog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete comment.' });
        }
    };

    async getCategories(req, res) {
        try {
            const categories = await blogService.getCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get blog categories.' });
        }
    };

    async likeBlog(req, res) {
        try {
            const { blogId } = req.params;
            const updatedBlog = await blogService.likeBlog(blogId);
            res.json(updatedBlog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to like blog post.' });
        }
    };

    async getCommentCount(req, res) {
        try {
            const { blogId } = req.params;
            const commentCount = await blogService.getCommentCount(blogId);
            res.json(commentCount);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get comment count.' });
        }
    };

    async getBlogByProduct(req, res) {
        try {
            const { productId } = req.params;
            const blog = await blogService.getBlogByProduct(productId);
            res.json(blog);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get comment count.' });
        }
    };
}

module.exports = BlogController;