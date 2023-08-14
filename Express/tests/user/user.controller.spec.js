const UserController = require('../../modules/user/controller/user.controller');
const UserServiceImpl = require('../../modules/user/service/impl/user.serviceImpl');

jest.mock('../../modules/user/service/impl/user.serviceImpl');

let userControllerBoundaryTest = `UsersController boundary test`;
describe('User Controller', () => {
    describe('boundary', () => {
        it(`${userControllerBoundaryTest} should create a new user`, async () => {
            const mReq = {
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'testpassword',
                    profile: {
                        firstName: 'John',
                        lastName: 'Doe',
                        address: '123 Main St',
                    },
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockUser = {
                _id: 'mockUserId',
                ...mReq.body,
            };

            UserServiceImpl.prototype.createUser.mockResolvedValueOnce(mockUser);

            await new UserController().createUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.createUser).toHaveBeenCalledWith(mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 400 error if email is already in use`, async () => {
            const mReq = {
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'testpassword',
                    profile: {
                        firstName: 'John',
                        lastName: 'Doe',
                        address: '123 Main St',
                    },
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserByEmail.mockResolvedValueOnce(mReq.body);

            await new UserController().createUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(mReq.body.email);
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Email address is already in use.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should retrieve a user profile by ID`, async () => {
            const userId = 'mockUserId';
            const mockUserProfile = {
                _id: userId,
                username: 'testuser',
                email: 'test@example.com',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St',
                },
            };

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserProfile.mockResolvedValueOnce(mockUserProfile);

            await new UserController().getUserProfile(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserProfile).toHaveBeenCalledWith(userId);
            expect(mRes.json).toHaveBeenCalledWith(mockUserProfile);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should update a user profile by ID`, async () => {
            const userId = 'mockUserId';
            const updatedProfile = {
                profile: {
                    firstName: 'Updated John',
                    lastName: 'Updated Doe',
                    address: '456 Updated St',
                },
            };
            const updatedUser = {
                _id: userId,
                username: 'testuser',
                email: 'test@example.com',
                ...updatedProfile,
            };

            const mReq = {
                params: { id: userId },
                body: updatedProfile,
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.updateUserProfile.mockResolvedValueOnce(updatedUser);

            await new UserController().updateUserProfile(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.updateUserProfile).toHaveBeenCalledWith(userId, updatedProfile);
            expect(mRes.json).toHaveBeenCalledWith(updatedUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should delete a user by ID`, async () => {
            const userId = 'mockUserId';
            const deletedUser = {
                _id: userId,
                username: 'testuser',
                email: 'test@example.com',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St',
                },
            };

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.deleteUser.mockResolvedValueOnce(deletedUser);

            await new UserController().deleteUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.deleteUser).toHaveBeenCalledWith(userId);
            expect(mRes.json).toHaveBeenCalledWith(deletedUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 404 error when getting user profile with invalid ID`, async () => {
            const userId = 'invalidUserId';

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserProfile.mockRejectedValueOnce(new Error('User not found.'));

            await new UserController().getUserProfile(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserProfile).toHaveBeenCalledWith(userId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 404 error when updating user profile with invalid ID`, async () => {
            const userId = 'invalidUserId';
            const updatedProfile = {
                profile: {
                    firstName: 'Updated John',
                    lastName: 'Updated Doe',
                    address: '456 Updated St',
                },
            };

            const mReq = {
                params: { id: userId },
                body: updatedProfile,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.updateUserProfile.mockRejectedValueOnce(new Error('User not found.'));

            await new UserController().updateUserProfile(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.updateUserProfile).toHaveBeenCalledWith(userId, updatedProfile);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 404 error when deleting user with invalid ID`, async () => {
            const userId = 'invalidUserId';

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.deleteUser.mockRejectedValueOnce(new Error('User not found.'));

            await new UserController().deleteUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.deleteUser).toHaveBeenCalledWith(userId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 400 error when creating a new user with missing required fields`, async () => {
            const mReq = {
                body: {
                    email: 'test@example.com',
                    password: 'testpassword',
                    profile: {
                        firstName: 'John',
                        lastName: 'Doe',
                        address: '123 Main St',
                    },
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new UserController().createUser(mReq, mRes, mNext);

            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Missing required fields.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should create a new user successfully`, async () => {
            const newUserData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword',
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St',
                },
            };

            const mReq = {
                body: newUserData,
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserByEmail.mockResolvedValueOnce(null);
            UserServiceImpl.prototype.createUser.mockResolvedValueOnce(newUserData);

            await new UserController().createUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(newUserData.email);
            expect(UserServiceImpl.prototype.createUser).toHaveBeenCalledWith(newUserData);
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(newUserData);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should change user password by ID`, async () => {
            const userId = 'mockUserId';
            const newPassword = 'newTestPassword';

            const mReq = {
                params: { id: userId },
                body: { newPassword },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockResult = { message: 'Password changed successfully.' };

            UserServiceImpl.prototype.changeUserPassword.mockResolvedValueOnce(mockResult);

            await new UserController().changeUserPassword(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.changeUserPassword).toHaveBeenCalledWith(userId, newPassword);
            expect(mRes.json).toHaveBeenCalledWith(mockResult);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 400 error when changing user password with missing newPassword`, async () => {
            const userId = 'mockUserId';

            const mReq = {
                params: { id: userId },
                body: {},
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            await new UserController().changeUserPassword(mReq, mRes, mNext);

            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'New password is required.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 500 error when failing to change user password`, async () => {
            const userId = 'mockUserId';
            const newPassword = 'newTestPassword';

            const mReq = {
                params: { id: userId },
                body: { newPassword },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.changeUserPassword.mockRejectedValueOnce(new Error('Failed to change user password.'));

            await new UserController().changeUserPassword(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.changeUserPassword).toHaveBeenCalledWith(userId, newPassword);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to change user password.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should retrieve user favorites by ID`, async () => {
            const userId = 'mockUserId';
            const mockUserFavorites = [
                { _id: 'favProductId1', name: 'Product 1' },
                { _id: 'favProductId2', name: 'Product 2' },
            ];

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserFavorites.mockResolvedValueOnce(mockUserFavorites);

            await new UserController().getUserFavorites(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserFavorites).toHaveBeenCalledWith(userId);
            expect(mRes.json).toHaveBeenCalledWith(mockUserFavorites);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 500 error when failing to retrieve user favorites`, async () => {
            const userId = 'mockUserId';

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserFavorites.mockRejectedValueOnce(new Error('Failed to retrieve user favorites.'));

            await new UserController().getUserFavorites(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserFavorites).toHaveBeenCalledWith(userId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to retrieve user favorites.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should retrieve user activity by ID`, async () => {
            const userId = 'mockUserId';
            const mockUserActivity = [
                { action: 'Login', timestamp: '2023-08-10T12:00:00Z' },
                { action: 'Logout', timestamp: '2023-08-10T14:00:00Z' },
            ];

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserActivity.mockResolvedValueOnce(mockUserActivity);

            await new UserController().getUserActivity(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserActivity).toHaveBeenCalledWith(userId);
            expect(mRes.json).toHaveBeenCalledWith(mockUserActivity);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 500 error when failing to retrieve user activity`, async () => {
            const userId = 'mockUserId';

            const mReq = {
                params: { id: userId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserActivity.mockRejectedValueOnce(new Error('Failed to retrieve user activity.'));

            await new UserController().getUserActivity(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserActivity).toHaveBeenCalledWith(userId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to retrieve user activity.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should retrieve a user by email`, async () => {
            const userEmail = 'test@example.com';
            const mockUser = {
                _id: 'mockUserId',
                username: 'testuser',
                email: userEmail,
                profile: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address: '123 Main St',
                },
            };

            const mReq = {
                params: { email: userEmail },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserByEmail.mockResolvedValueOnce(mockUser);

            await new UserController().getUserByEmail(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(userEmail);
            expect(mRes.json).toHaveBeenCalledWith(mockUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${userControllerBoundaryTest} should return a 500 error when failing to retrieve user by email`, async () => {
            const userEmail = 'test@example.com';

            const mReq = {
                params: { email: userEmail },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            UserServiceImpl.prototype.getUserByEmail.mockRejectedValueOnce(new Error('Failed to retrieve user by email.'));

            await new UserController().getUserByEmail(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(userEmail);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to retrieve user by email.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
