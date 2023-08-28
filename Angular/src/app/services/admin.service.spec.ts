import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
    let adminService: AdminService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/admin';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AdminService]
        });

        adminService = TestBed.inject(AdminService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(adminService).toBeTruthy();
        });

        it('should fetch all users', () => {
            const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
            adminService.viewAllUsers().subscribe((users: any) => {
                expect(users).toEqual(mockUsers);
            });
            const req = httpTestingController.expectOne(`${baseURL}/users`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUsers);
        });

        it('should fetch all products', () => {
            const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            adminService.viewAllProducts().subscribe((products: any) => {
                expect(products).toEqual(mockProducts);
            });
            const req = httpTestingController.expectOne(`${baseURL}/products`);
            expect(req.request.method).toBe('GET');
            req.flush(mockProducts);
        });

        it('should fetch all orders', () => {
            const mockOrders = [{ id: 1, total: 100 }, { id: 2, total: 200 }];
            adminService.viewAllOrders().subscribe((orders: any) => {
                expect(orders).toEqual(mockOrders);
            });
            const req = httpTestingController.expectOne(`${baseURL}/orders`);
            expect(req.request.method).toBe('GET');
            req.flush(mockOrders);
        });

        it('should fetch all blog posts', () => {
            const mockBlogPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
            adminService.viewAllBlogPosts().subscribe((blogPosts: any) => {
                expect(blogPosts).toEqual(mockBlogPosts);
            });
            const req = httpTestingController.expectOne(`${baseURL}/blogs`);
            expect(req.request.method).toBe('GET');
            req.flush(mockBlogPosts);
        });

        it('should fetch dashboard data', () => {
            const mockDashboardData = { totalUsers: 100, totalOrders: 200 };
            adminService.viewDashboard().subscribe((data: any) => {
                expect(data).toEqual(mockDashboardData);
            });
            const req = httpTestingController.expectOne(`${baseURL}/dashboard`);
            expect(req.request.method).toBe('GET');
            req.flush(mockDashboardData);
        });

        it('should fetch reports', () => {
            const mockReports = [{ id: 1, name: 'Report 1' }, { id: 2, name: 'Report 2' }];
            adminService.viewReports().subscribe((reports: any) => {
                expect(reports).toEqual(mockReports);
            });
            const req = httpTestingController.expectOne(`${baseURL}/reports`);
            expect(req.request.method).toBe('GET');
            req.flush(mockReports);
        });

        it('should fetch user analytics', () => {
            const mockUserAnalytics = { totalSales: 500, averageOrderValue: 50 };
            adminService.viewUserAnalytics().subscribe((analytics: any) => {
                expect(analytics).toEqual(mockUserAnalytics);
            });
            const req = httpTestingController.expectOne(`${baseURL}/reports/sales`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUserAnalytics);
        });

        it('should fetch product inventory', () => {
            const mockProductInventory = { totalProducts: 1000, outOfStock: 200 };
            adminService.viewProductInventory().subscribe((inventory: any) => {
                expect(inventory).toEqual(mockProductInventory);
            });
            const req = httpTestingController.expectOne(`${baseURL}/products/inventory`);
            expect(req.request.method).toBe('GET');
            req.flush(mockProductInventory);
        });

        it('should fetch sales reports', () => {
            const mockSalesReports = { totalRevenue: 10000, mostSoldProduct: 'Product X' };
            adminService.viewSalesReports().subscribe((reports: any) => {
                expect(reports).toEqual(mockSalesReports);
            });
            const req = httpTestingController.expectOne(`${baseURL}/orders/analytics`);
            expect(req.request.method).toBe('GET');
            req.flush(mockSalesReports);
        });
    });
});
