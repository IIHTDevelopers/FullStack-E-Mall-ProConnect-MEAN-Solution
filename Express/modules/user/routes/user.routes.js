const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller');
const userController = new UserController();

router.post('/create', userController.createUser);
router.get('/:id', userController.getUserProfile);
router.put('/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUser);
router.get('/:id/activity', userController.getUserActivity);
router.get('/:id/favorites', userController.getUserFavorites);
router.put('/change-password/:id', userController.changeUserPassword);
router.get('/email/:email', userController.getUserByEmail);

module.exports = router;
