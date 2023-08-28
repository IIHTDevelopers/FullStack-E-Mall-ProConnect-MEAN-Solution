const AdminServiceImpl = require('../../modules/admin/service/impl/admin.serviceImpl');
const User = require('../../modules/user/dao/models/user.model');
const Product = require('../../modules/product/dao/models/product.model');
const Order = require('../../modules/order/dao/models/order.model');
const Blog = require('../../modules/blog/dao/models/blog.model');

jest.mock('../../modules/user/dao/models/user.model');
jest.mock('../../modules/product/dao/models/product.model');
jest.mock('../../modules/order/dao/models/order.model');
jest.mock('../../modules/blog/dao/models/blog.model');

let adminServiceBoundaryTest = `AdminService functional test`;

describe('Admin Service', () => {
    let adminService;

    beforeEach(() => {
        adminService = new AdminServiceImpl(User, Product, Order, Blog);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${adminServiceBoundaryTest} should get all users`, async () => {
            const users = [
                { _id: 'user_id_1', name: 'User 1' },
                { _id: 'user_id_2', name: 'User 2' },
            ];
            User.find.mockResolvedValue(users);

            const result = await adminService.getAllUsers();
            expect(result).toEqual(users);
        });

        it(`${adminServiceBoundaryTest} should get all products`, async () => {
            const products = [
                { _id: 'product_id_1', name: 'Product 1' },
                { _id: 'product_id_2', name: 'Product 2' },
            ];
            Product.find.mockResolvedValue(products);

            const result = await adminService.getAllProducts();
            expect(result).toEqual(products);
        });

        it(`${adminServiceBoundaryTest} should get all orders`, async () => {
            const orders = [
                { _id: 'order_id_1', orderNumber: '12345' },
                { _id: 'order_id_2', orderNumber: '67890' },
            ];
            Order.find.mockResolvedValue(orders);

            const result = await adminService.getAllOrders();
            expect(result).toEqual(orders);
        });

        it(`${adminServiceBoundaryTest} should get all blogs`, async () => {
            const blogs = [
                { _id: 'blog_id_1', title: 'Blog 1' },
                { _id: 'blog_id_2', title: 'Blog 2' },
            ];
            Blog.find.mockResolvedValue(blogs);

            const result = await adminService.getAllBlogs();
            expect(result).toEqual(blogs);
        });

        it(`${adminServiceBoundaryTest} should throw an error when failing to get all users`, async () => {
            const error = new Error('Failed to get users.');
            User.find.mockRejectedValue(error);
            await expect(adminService.getAllUsers()).rejects.toThrow(error);
        });

        it(`${adminServiceBoundaryTest} should throw an error when failing to get all products`, async () => {
            const error = new Error('Failed to get products.');
            Product.find.mockRejectedValue(error);
            await expect(adminService.getAllProducts()).rejects.toThrow(error);
        });

        it(`${adminServiceBoundaryTest} should throw an error when failing to get all orders`, async () => {
            const error = new Error('Failed to get orders.');
            Order.find.mockRejectedValue(error);
            await expect(adminService.getAllOrders()).rejects.toThrow(error);
        });

        it(`${adminServiceBoundaryTest} should throw an error when failing to get all blogs`, async () => {
            const error = new Error('Failed to get blogs.');
            Blog.find.mockRejectedValue(error);
            await expect(adminService.getAllBlogs()).rejects.toThrow(error);
        });

        it(`${adminServiceBoundaryTest} should get financial reports`, async () => {
            const financialReports = {
                totalRevenue: 150000,
                totalExpenses: 50000,
                netProfit: 100000,
            };
            // Implement mocking logic for the FinancialModel if needed

            const result = await adminService.getFinancialReports();
            expect(result).toEqual(financialReports);
        });

        it(`${adminServiceBoundaryTest} should get popular products report`, async () => {
            const popularProducts = [
                { _id: 'product_id_1', name: 'Product 1', sales: 100 },
                { _id: 'product_id_2', name: 'Product 2', sales: 80 },
            ];
            Product.find.mockResolvedValue(popularProducts);

            const result = await adminService.getPopularProductsReport();
            expect(result).toEqual(popularProducts);
        });

        it(`${adminServiceBoundaryTest} should get user engagement report`, async () => {
            const userEngagementData = {
                totalUsers: 1000,
                averageTimeOnSite: 15,
            };
            User.countDocuments.mockResolvedValue(userEngagementData.totalUsers);

            const result = await adminService.getUserEngagementReport();
            expect(result).toEqual(userEngagementData);
        });

        // it(`${adminServiceBoundaryTest} should throw an error when failing to generate popular products report`, async () => {
        //     const error = new Error('Failed to generate popular products report.');
        //     Product.find.mockRejectedValue(error);
        //     await expect(adminService.getPopularProductsReport()).rejects.toThrow(error);
        // });

        // it(`${adminServiceBoundaryTest} should throw an error when failing to generate user engagement report`, async () => {
        //     const error = new Error('Failed to generate user engagement report.');
        //     User.countDocuments.mockRejectedValue(error);
        //     await expect(adminService.getUserEngagementReport()).rejects.toThrow(error);
        // });

        // it(`${adminServiceBoundaryTest} should get user-related analytics`, async () => {
        //     const userAnalytics = {
        //         totalUsers: 1000,
        //         activeUsers: 800,
        //         inactiveUsers: 200,
        //     };
        //     // Implement mocking logic for the UserModel if needed

        //     const result = await adminService.getUserAnalytics();
        //     expect(result).toEqual(userAnalytics);
        // });

        // it(`${adminServiceBoundaryTest} should get product inventory details`, async () => {
        //     const productInventory = [
        //         { _id: 'product_id_1', name: 'Product 1' },
        //         { _id: 'product_id_2', name: 'Product 2' },
        //     ];
        //     // Implement mocking logic for the ProductModel if needed

        //     const result = await adminService.getProductNames();
        //     expect(result).toEqual(productInventory);
        // });

        // it(`${adminServiceBoundaryTest} should get order-related analytics`, async () => {
        //     const orderAnalytics = {
        //         totalOrders: 500,
        //         pendingOrders: 100,
        //         completedOrders: 300,
        //         cancelledOrders: 100,
        //     };
        //     // Implement mocking logic for the OrderModel if needed

        //     const result = await adminService.getOrderAnalytics();
        //     expect(result).toEqual(orderAnalytics);
        // });

        // it(`${adminServiceBoundaryTest} should throw an error when failing to get user-related analytics`, async () => {
        //     const error = new Error('Failed to get user-related analytics.');
        //     // Implement mocking logic for the UserModel if needed

        //     await expect(adminService.getUserAnalytics()).rejects.toThrow(error);
        // });

        it(`${adminServiceBoundaryTest} should throw an error when failing to get product names details`, async () => {
            const error = new Error('Failed to get product names.');
            // Implement mocking logic for the ProductModel if needed

            await expect(adminService.getProductNames()).rejects.toThrow(error);
        });

        it(`${adminServiceBoundaryTest} should generate sales report`, async () => {
            const totalOrders = 10;
            const totalRevenue = 1500;

            Order.countDocuments.mockResolvedValue(totalOrders);

            // Use jest.spyOn to mock the aggregate function
            const mockAggregate = jest.spyOn(Order, 'aggregate');
            mockAggregate.mockResolvedValue([{ _id: null, totalAmount: totalRevenue }]);

            const expectedSalesReport = {
                totalOrders: totalOrders,
                totalRevenue: totalRevenue,
            };

            const result = await adminService.getSalesReports();
            expect(result).toEqual(expectedSalesReport);

            // Ensure that Order.countDocuments and Order.aggregate were called
            expect(Order.countDocuments).toHaveBeenCalled();
            expect(mockAggregate).toHaveBeenCalledWith([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: '$totalAmount' },
                    },
                },
            ]);
        });

        it(`${adminServiceBoundaryTest} should throw an error when failing to generate sales report`, async () => {
            const error = new Error('Failed to generate sales report.');
            Order.countDocuments.mockRejectedValue(error);
            await expect(adminService.getSalesReports()).rejects.toThrow(error);
        });
    });
});
