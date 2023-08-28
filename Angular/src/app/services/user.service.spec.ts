import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
    let userService: UserService;
    let httpTestingController: HttpTestingController;
    const baseURL = 'http://127.0.0.1:8081/api/users';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        userService = TestBed.inject(UserService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('business', () => {
        it('should be created', () => {
            expect(userService).toBeTruthy();
        });

        it('should create a user', () => {
            const mockUser: User = {
                _id: '1',
                username: 'user123',
                email: 'user@example.com',
                password: 'password123',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, City, Country'
                },
                activityLog: [
                    {
                        action: 'Login',
                        timestamp: new Date('2023-08-27T10:00:00Z')
                    },
                    {
                        action: 'Logout',
                        timestamp: new Date('2023-08-27T18:00:00Z')
                    }
                ],
                favorites: ['product123', 'product456']
            };
            userService.createUser(mockUser).subscribe((createdUser: User) => {
                expect(createdUser).toEqual(mockUser);
            });
            const req = httpTestingController.expectOne(`${baseURL}/create`);
            expect(req.request.method).toBe('POST');
            req.flush(mockUser);
        });

        it('should fetch a user profile by ID', () => {
            const mockUserId = '1';
            const mockUser: User = {
                _id: '1',
                username: 'user123',
                email: 'user@example.com',
                password: 'password123',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, City, Country'
                },
                activityLog: [
                    {
                        action: 'Login',
                        timestamp: new Date('2023-08-27T10:00:00Z')
                    },
                    {
                        action: 'Logout',
                        timestamp: new Date('2023-08-27T18:00:00Z')
                    }
                ],
                favorites: ['product123', 'product456']
            };
            userService.getUserProfile(mockUserId).subscribe((fetchedUser: User) => {
                expect(fetchedUser).toEqual(mockUser);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockUserId}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUser);
        });

        it('should update a user profile', () => {
            const mockUserId = '1';
            const mockUser: User = {
                _id: '1',
                username: 'user123',
                email: 'user@example.com',
                password: 'password123',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, City, Country'
                },
                activityLog: [
                    {
                        action: 'Login',
                        timestamp: new Date('2023-08-27T10:00:00Z')
                    },
                    {
                        action: 'Logout',
                        timestamp: new Date('2023-08-27T18:00:00Z')
                    }
                ],
                favorites: ['product123', 'product456']
            };
            const updatedMockUser: User = { ...mockUser, username: 'updatedUser' };
            userService.updateUserProfile(mockUserId, updatedMockUser).subscribe((updatedUser: User) => {
                expect(updatedUser).toEqual(updatedMockUser);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockUserId}`);
            expect(req.request.method).toBe('PUT');
            req.flush(updatedMockUser);
        });

        it('should delete a user', () => {
            const mockUserId = '1';
            const mockUser: User = {
                _id: '1',
                username: 'user123',
                email: 'user@example.com',
                password: 'password123',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, City, Country'
                },
                activityLog: [
                    {
                        action: 'Login',
                        timestamp: new Date('2023-08-27T10:00:00Z')
                    },
                    {
                        action: 'Logout',
                        timestamp: new Date('2023-08-27T18:00:00Z')
                    }
                ],
                favorites: ['product123', 'product456']
            };
            userService.deleteUser(mockUserId).subscribe((deletedUser: User) => {
                expect(deletedUser).toEqual(mockUser);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockUserId}`);
            expect(req.request.method).toBe('DELETE');
            req.flush(mockUser);
        });

        it('should fetch a user by email', () => {
            const mockEmail = 'user@example.com';
            const mockUser: User = {
                _id: '1',
                username: 'user123',
                email: 'user@example.com',
                password: 'password123',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St, City, Country'
                },
                activityLog: [
                    {
                        action: 'Login',
                        timestamp: new Date('2023-08-27T10:00:00Z')
                    },
                    {
                        action: 'Logout',
                        timestamp: new Date('2023-08-27T18:00:00Z')
                    }
                ],
                favorites: ['product123', 'product456']
            };
            userService.getUserByEmail(mockEmail).subscribe((fetchedUser: User) => {
                expect(fetchedUser).toEqual(mockUser);
            });
            const req = httpTestingController.expectOne(`${baseURL}/email/${mockEmail}`);
            expect(req.request.method).toBe('GET');
            req.flush(mockUser);
        });

        it('should fetch user activity log', () => {
            const mockUserId = '1';
            const mockActivityLog = [
                {
                    action: 'Login',
                    timestamp: new Date()
                },
                {
                    action: 'Logout',
                    timestamp: new Date()
                }
            ];
            userService.getUserActivity(mockUserId).subscribe((activityLog: any) => {
                expect(activityLog).toEqual(mockActivityLog);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockUserId}/activity`);
            expect(req.request.method).toBe('GET');
            req.flush(mockActivityLog);
        });

        it('should fetch user favorites', () => {
            const mockUserId = '1';
            const mockFavorites = ['product123', 'product456'];
            userService.getUserFavorites(mockUserId).subscribe((favorites: any) => {
                expect(favorites).toEqual(mockFavorites);
            });
            const req = httpTestingController.expectOne(`${baseURL}/${mockUserId}/favorites`);
            expect(req.request.method).toBe('GET');
            req.flush(mockFavorites);
        });

        it('should change user password', () => {
            const mockUserId = '1';
            const newPassword = 'newpassword123';
            const mockChangePasswordResponse = {
                success: true,
                message: 'Password changed successfully'
            };
            userService.changeUserPassword(mockUserId, newPassword).subscribe((response: any) => {
                expect(response).toEqual(mockChangePasswordResponse);
            });
            const req = httpTestingController.expectOne(`${baseURL}/change-password/${mockUserId}`);
            expect(req.request.method).toBe('PUT');
            req.flush(mockChangePasswordResponse);
        });
    });
});
