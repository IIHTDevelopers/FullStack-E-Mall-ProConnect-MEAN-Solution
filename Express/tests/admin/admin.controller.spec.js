const AdminController = require('../../modules/admin/controller/admin.controller');
const AdminServiceImpl = require('../../modules/admin/service/impl/admin.serviceImpl');

jest.mock('../../modules/admin/service/impl/admin.serviceImpl');

let adminControllerBoundaryTest = `AdminController boundary test`;

describe('Admin Controller', () => {
    describe('boundary', () => {
        it(`${adminControllerBoundaryTest} should retrieve all users`, async () => {
            const mockUsers = [
                { _id: 'user_id_1', name: 'User 1' },
                { _id: 'user_id_2', name: 'User 2' },
            ];

            AdminServiceImpl.prototype.viewAllUsers = jest.fn().mockResolvedValueOnce(mockUsers);

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new AdminController().viewAllUsers(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllUsers).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockUsers);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should retrieve all products`, async () => {
            const mockProducts = [
                { _id: 'product_id_1', name: 'Product 1' },
                { _id: 'product_id_2', name: 'Product 2' },
            ];

            AdminServiceImpl.prototype.viewAllProducts = jest.fn().mockResolvedValueOnce(mockProducts);

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new AdminController().viewAllProducts(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllProducts).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockProducts);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should retrieve all orders`, async () => {
            const mockOrders = [
                { _id: 'order_id_1', orderNumber: '12345' },
                { _id: 'order_id_2', orderNumber: '54321' },
            ];

            AdminServiceImpl.prototype.viewAllOrders = jest.fn().mockResolvedValueOnce(mockOrders);

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new AdminController().viewAllOrders(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllOrders).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockOrders);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should retrieve all blog posts`, async () => {
            const mockBlogPosts = [
                { _id: 'blog_id_1', title: 'Blog Post 1' },
                { _id: 'blog_id_2', title: 'Blog Post 2' },
            ];

            AdminServiceImpl.prototype.viewAllBlogPosts = jest.fn().mockResolvedValueOnce(mockBlogPosts);

            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new AdminController().viewAllBlogPosts(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllBlogPosts).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockBlogPosts);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should return a 500 error when retrieving users fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to fetch users.');
            AdminServiceImpl.prototype.viewAllUsers = jest.fn().mockRejectedValueOnce(error);

            await new AdminController().viewAllUsers(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllUsers).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch users.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should return a 500 error when retrieving products fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to fetch products.');
            AdminServiceImpl.prototype.viewAllProducts = jest.fn().mockRejectedValueOnce(error);

            await new AdminController().viewAllProducts(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllProducts).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch products.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should return a 500 error when retrieving orders fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to fetch orders.');
            AdminServiceImpl.prototype.viewAllOrders = jest.fn().mockRejectedValueOnce(error);

            await new AdminController().viewAllOrders(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllOrders).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch orders.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${adminControllerBoundaryTest} should return a 500 error when retrieving blog posts fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('Failed to fetch blog posts.');
            AdminServiceImpl.prototype.viewAllBlogPosts = jest.fn().mockRejectedValueOnce(error);

            await new AdminController().viewAllBlogPosts(mReq, mRes, mNext);

            expect(AdminServiceImpl.prototype.viewAllBlogPosts).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch blog posts.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
