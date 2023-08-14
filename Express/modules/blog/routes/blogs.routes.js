const express = require('express');
const router = express.Router();

const BlogController = require('../controller/blog.controller');
const blogController = new BlogController();

router.post('/create', blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.get('/all', blogController.getAllBlogs);
router.get('/popular', blogController.getPopularBlogs);
router.post('/:id/comments', blogController.addComment);
router.put('/:id/comments/:commentId', blogController.editComment);
router.delete('/:id/comments/:commentId', blogController.deleteComment);
router.get('/categories', blogController.getCategories);
router.put('/:id/like', blogController.likeBlog);
router.get('/:id/comments/count', blogController.getCommentCount);

module.exports = router;
