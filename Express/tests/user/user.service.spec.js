const UserServiceImpl = require('../../modules/user/service/impl/user.serviceImpl');
const User = require('../../modules/user/dao/models/user.model');

jest.mock('../../modules/user/dao/models/user.model');

let userServiceBoundaryTest = `UsersService functional test`;
describe('Users Service', () => {
    let userService;

    beforeEach(() => {
        userService = new UserServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${userServiceBoundaryTest} should create a new user`, async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
            User.create.mockResolvedValue(userData);

            const result = await userService.createUser(userData);
            expect(result).toEqual(userData);
        });

        it(`${userServiceBoundaryTest} should get user profile by ID`, async () => {
            const userId = 'user_id';
            const userProfile = { _id: userId, username: 'testuser' };
            User.findById.mockResolvedValue(userProfile);

            const result = await userService.getUserProfile(userId);
            expect(result).toEqual(userProfile);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to fetch user by email`, async () => {
            const email = 'test@example.com';
            const error = new Error('User not found.');
            User.findOne.mockRejectedValue(error);
            await expect(userService.getUserByEmail(email)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should update user profile by ID`, async () => {
            const userId = 'user_id';
            const updatedProfile = { firstName: 'John', lastName: 'Doe' };
            const updatedUser = { _id: userId, username: 'testuser', profile: updatedProfile };
            User.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const result = await userService.updateUserProfile(userId, updatedProfile);
            expect(result).toEqual(updatedUser);
        });

        it(`${userServiceBoundaryTest} should delete user by ID`, async () => {
            const userId = 'user_id';
            const deletedUser = { _id: userId, username: 'testuser' };
            User.findByIdAndDelete.mockResolvedValue(deletedUser);

            const result = await userService.deleteUser(userId);
            expect(result).toEqual(deletedUser);
        });

        it(`${userServiceBoundaryTest} should throw an error when user is not found for getUserProfile`, async () => {
            const userId = 'non_existing_id';
            User.findById.mockResolvedValue(null);
            await expect(userService.getUserProfile(userId)).rejects.toThrow('Failed to get user profile.');
        });

        it(`${userServiceBoundaryTest} should throw an error when user is not found for updateUserProfile`, async () => {
            const userId = 'non_existing_id';
            const updatedProfile = { firstName: 'John', lastName: 'Doe' };
            User.findByIdAndUpdate.mockResolvedValue(null);
            await expect(userService.updateUserProfile(userId, updatedProfile)).rejects.toThrow('Failed to update user profile.');
        });

        it(`${userServiceBoundaryTest} should throw an error when user is not found for deleteUser`, async () => {
            const userId = 'non_existing_id';
            User.findByIdAndDelete.mockResolvedValue(null);
            await expect(userService.deleteUser(userId)).rejects.toThrow('Failed to delete user.');
        });

        it(`${userServiceBoundaryTest} should throw an error when user is not found for getUserByEmail`, async () => {
            const email = 'non_existing_email@example.com';
            User.findOne.mockResolvedValue(null);
            await expect(userService.getUserByEmail(email)).rejects.toThrow('User not found.');
        });

        it(`${userServiceBoundaryTest} should fetch user by email`, async () => {
            const email = 'test@example.com';
            const user = { _id: 'user_id', email: email, username: 'testuser' };
            User.findOne.mockResolvedValue(user);

            const result = await userService.getUserByEmail(email);
            expect(result).toEqual(user);
        });

        it(`${userServiceBoundaryTest} should fetch user by email`, async () => {
            const email = 'test@example.com';
            const user = { _id: 'user_id', email: email, username: 'testuser' };
            User.findOne.mockResolvedValue(user);

            const result = await userService.getUserByEmail(email);
            expect(result).toEqual(user);
        });

        it(`${userServiceBoundaryTest} should throw an error when getting user by non-existing email`, async () => {
            const email = 'non_existing_email@example.com';
            User.findOne.mockResolvedValue(null);
            await expect(userService.getUserByEmail(email)).rejects.toThrow('User not found.');
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to fetch user by email`, async () => {
            const email = 'test@example.com';
            const error = new Error('User not found.');
            User.findOne.mockRejectedValue(error);
            await expect(userService.getUserByEmail(email)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should get user activity by ID`, async () => {
            const userId = 'user_id';
            const userActivity = [{ action: 'action1', timestamp: new Date() }];
            User.findById.mockResolvedValue({ _id: userId, activityLog: userActivity });

            const result = await userService.getUserActivity(userId);
            expect(result).toEqual(userActivity);
        });

        // it(`${userServiceBoundaryTest} should get user favorites by ID`, async () => {
        //     const userData = {
        //         username: 'testuser',
        //         email: 'test@example.com',
        //         password: 'testpassword',
        //         profile: {
        //             firstName: 'John',
        //             lastName: 'Doe',
        //             address: '123 Main St',
        //         },
        //     };

        //     const newUser = await userService.createUser(userData);
        //     const userId = newUser._id.toString();

        //     const userFavorites = [{ _id: 'product_id', name: 'Product 1' }];
        //     User.findById.mockResolvedValue({ _id: userId, favorites: userFavorites });

        //     const result = await userService.getUserFavorites(userId);
        //     expect(result).toEqual(userFavorites);
        // });


        // it(`${userServiceBoundaryTest} should change user password by ID`, async () => {
        //     const userId = 'user_id';
        //     const newPassword = 'newpassword';
        //     User.findById.mockResolvedValue({ _id: userId, password: 'oldpassword', save: jest.fn() });

        //     const result = await userService.changeUserPassword(userId, newPassword);
        //     expect(result).toEqual({ message: 'Password changed successfully.' });
        // });

        it(`${userServiceBoundaryTest} should throw an error when changing password for non-existing user`, async () => {
            const userId = 'non_existing_id';
            const newPassword = 'newpassword';
            User.findById.mockResolvedValue(null);
            await expect(userService.changeUserPassword(userId, newPassword)).rejects.toThrow('Failed to change user password.');
        });

        it(`${userServiceBoundaryTest} should throw an error when getting user activity for non-existing user`, async () => {
            const userId = 'non_existing_id';
            User.findById.mockResolvedValue(null);
            await expect(userService.getUserActivity(userId)).rejects.toThrow('Failed to get user activity.');
        });

        it(`${userServiceBoundaryTest} should throw an error when getting user favorites for non-existing user`, async () => {
            const userId = 'non_existing_id';
            User.findById.mockResolvedValue(null);
            await expect(userService.getUserFavorites(userId)).rejects.toThrow('Failed to get user favorites.');
        });
    });
});
