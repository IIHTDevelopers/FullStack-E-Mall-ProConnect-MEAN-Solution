const express = require('express');
const router = express.Router();

const AdminController = require('../controller/admin.controller');
const adminController = new AdminController();

router.get('/users', adminController.viewAllUsers);
router.get('/products', adminController.viewAllProducts);
router.get('/orders', adminController.viewAllOrders);
router.get('/blogs', adminController.viewAllBlogPosts);
router.get('/dashboard', adminController.viewDashboard);
router.get('/reports', adminController.viewReports);
router.get('/reports/sales', adminController.viewSalesReports);
router.get('/products/inventory', adminController.viewProductInventory); // Use correct method name
router.get('/orders/analytics', adminController.viewUserAnalytics); // Use correct method name
// router.get('/sales/report', adminController.getSalesReports);

module.exports = router;
