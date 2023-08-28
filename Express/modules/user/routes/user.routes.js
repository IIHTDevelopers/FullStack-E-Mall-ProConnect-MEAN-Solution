const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller');
const adminMiddleware = require('../../middleware/authAdminMiddleware');
const authMiddleware = require('../../middleware/authUserMiddleware');
const userController = new UserController();

router.post('/login', userController.loginUser);
router.post('/create', authMiddleware, adminMiddleware, userController.createUser);
router.get('/:id', authMiddleware, userController.getUserProfile);
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);
router.get('/:id/activity', authMiddleware, userController.getUserActivity);
router.get('/:id/favorites', authMiddleware, userController.getUserFavorites);
router.put('/change-password/:id', authMiddleware, userController.changeUserPassword);
router.get('/email/:email', authMiddleware, userController.getUserByEmail);

module.exports = router;
