const express = require('express');
const router = express.Router();

const AdminController = require('../controller/admin.controller');
const adminMiddleware = require('../../middleware/authAdminMiddleware');
const authMiddleware = require('../../middleware/authUserMiddleware');
const adminController = new AdminController();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/users', adminController.viewAllUsers);
router.get('/products', adminController.viewAllProducts);
router.get('/orders', adminController.viewAllOrders);
router.get('/blogs', adminController.viewAllBlogPosts);
router.get('/dashboard', adminController.viewDashboard);
router.get('/reports', adminController.viewReports);
router.get('/reports/sales', adminController.viewSalesReports);
router.get('/products/inventory', adminController.viewProductInventory);
router.get('/orders/analytics', adminController.viewUserAnalytics);

module.exports = router;
