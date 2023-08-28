const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const AdminController = require('../../modules/admin/controller/admin.controller');
const AdminServiceImpl = require('../../modules/admin/service/impl/admin.serviceImpl');

jest.mock('../../modules/admin/service/impl/admin.serviceImpl');

const app = express();
var req = require('supertest')(app);

let adminControllerBoundaryTest = `AdminController boundary test`;
describe('Admin Controller Test', () => {
    beforeEach(() => {
        AdminServiceImpl.mockClear();
    });

    describe('boundary', () => {
        it(`${adminControllerBoundaryTest} GET /users should return a list of users`, async () => {
            const mockUsers = [];
            AdminServiceImpl.prototype.getAllUsers.mockResolvedValue(mockUsers);
            const adminController = new AdminController();
            app.get('/users', adminController.viewAllUsers);
            const response = await request(app).get('/users');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });

        it(`${adminControllerBoundaryTest} GET /products should return a list of products`, async () => {
            const mockProducts = [];
            AdminServiceImpl.prototype.getAllProducts.mockResolvedValue(mockProducts);
            const adminController = new AdminController();
            app.get('/products', adminController.viewAllProducts);
            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
        });

        it(`${adminControllerBoundaryTest} GET /orders should return a list of orders`, async () => {
            const mockOrders = [];
            AdminServiceImpl.prototype.getAllOrders.mockResolvedValue(mockOrders);
            const adminController = new AdminController();
            app.get('/orders', adminController.viewAllOrders);
            const response = await request(app).get('/orders');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockOrders);
        });

        it(`${adminControllerBoundaryTest} GET /blogs should return a list of blog posts`, async () => {
            const mockBlogs = [];
            AdminServiceImpl.prototype.getAllBlogs.mockResolvedValue(mockBlogs);
            const adminController = new AdminController();
            app.get('/blogs', adminController.viewAllBlogPosts);
            const response = await request(app).get('/blogs');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockBlogs);
        });

        it(`${adminControllerBoundaryTest} GET /dashboard should return dashboard data`, async () => {
            const mockDashboardData = {};
            AdminServiceImpl.prototype.getDashboard.mockResolvedValue(mockDashboardData);
            const adminController = new AdminController();
            app.get('/dashboard', adminController.viewDashboard);
            const response = await request(app).get('/dashboard');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockDashboardData);
        });

        it(`${adminControllerBoundaryTest} GET /reports should return reports data`, async () => {
            const mockReportsData = {};
            AdminServiceImpl.prototype.getReports.mockResolvedValue(mockReportsData);
            const adminController = new AdminController();
            app.get('/reports', adminController.viewReports);
            const response = await request(app).get('/reports');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockReportsData);
        });

        it(`${adminControllerBoundaryTest} GET /reports/sales should return sales reports data`, async () => {
            const mockSalesReport = {};
            AdminServiceImpl.prototype.getSalesReports.mockResolvedValue(mockSalesReport);
            const adminController = new AdminController();
            app.get('/reports/sales', adminController.viewSalesReports);
            const response = await request(app).get('/reports/sales');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSalesReport);
        });
    });
});