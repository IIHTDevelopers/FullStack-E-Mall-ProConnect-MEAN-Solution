const express = require('express');
const router = express.Router();

const BlogController = require('../controller/blog.controller');
const authMiddleware = require('../../middleware/authUserMiddleware');
const blogController = new BlogController();

router.post('/create', authMiddleware, blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);
router.get('/product/:productId', blogController.getBlogByProduct);
router.get('/all', blogController.getAllBlogs);
router.get('/popular', blogController.getPopularBlogs);
router.post('/:id/comments', authMiddleware, blogController.addComment);
router.put('/:id/comments/:commentId', authMiddleware, blogController.editComment);
router.delete('/:id/comments/:commentId', authMiddleware, blogController.deleteComment);
router.get('/categories', blogController.getCategories);
router.put('/:id/like', authMiddleware, blogController.likeBlog);
router.get('/:id/comments/count', blogController.getCommentCount);

module.exports = router;
