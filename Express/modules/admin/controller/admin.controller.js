const AdminServiceImpl = require('../service/impl/admin.serviceImpl');

const adminService = new AdminServiceImpl();

class AdminController {
    async viewAllUsers(req, res) {
        try {
            const users = await adminService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users.' });
        }
    };

    async viewAllProducts(req, res) {
        try {
            const products = await adminService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products.' });
        }
    };

    async viewAllOrders(req, res) {
        try {
            const orders = await adminService.getAllOrders();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch orders.' });
        }
    };

    async viewAllBlogPosts(req, res) {
        try {
            const blogPosts = await adminService.getAllBlogs();
            res.json(blogPosts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch blog posts.' });
        }
    };

    async viewDashboard(req, res) {
        try {
            const dashboardData = await adminService.getDashboard();
            res.json(dashboardData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch admin dashboard data.' });
        }
    }

    async viewReports(req, res) {
        try {
            const reportsData = await adminService.getReports();
            res.json(reportsData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate admin reports.' });
        }
    }

    async viewUserAnalytics(req, res) {
        try {
            const userAnalytics = await adminService.getUserAnalytics();
            res.json(userAnalytics);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user analytics.' });
        }
    }

    async viewProductInventory(req, res) {
        try {
            const productNames = await adminService.getProductNames();
            res.json(productNames);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product inventory.' });
        }
    }

    async viewSalesReports(req, res) {
        try {
            const salesReport = await adminService.getSalesReports();
            res.json(salesReport);
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate sales reports.' });
        }
    }
}

module.exports = AdminController;
