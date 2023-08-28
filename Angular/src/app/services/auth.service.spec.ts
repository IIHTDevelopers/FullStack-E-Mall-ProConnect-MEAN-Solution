import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let authService: AuthService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/users';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [AuthService]
        });

        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(authService).toBeTruthy();
        });

        it('should perform login', () => {
            const mockResponse = {
                token: 'mockToken'
            };
            const mockEmail = 'user@example.com';
            const mockPassword = 'password123';

            authService.login(mockEmail, mockPassword);

            const req = httpTestingController.expectOne(`${baseURL}/login`);
            expect(req.request.method).toBe('POST');
            req.flush(mockResponse);

            expect(authService.getToken()).toBe(mockResponse.token);
        });

        it('should perform logout', () => {
            authService.logout();

            expect(authService.getToken()).toBeNull();
        });
    });
});
