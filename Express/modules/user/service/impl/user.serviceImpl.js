const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require("../user.service");
const User = require("../../dao/models/user.model");

class UserServiceImpl extends UserService {
    async createUser(userData) {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Failed to create user.' + JSON.stringify(error));
        }
    }

    async getUserProfile(userId) {
        try {
            const userProfile = await User.findById(userId);
            if (!userProfile) {
                throw new Error('User not found.');
            }
            return userProfile;
        } catch (error) {
            throw new Error('Failed to get user profile.');
        }
    }

    async updateUserProfile(userId, updatedProfile) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
            if (!updatedUser) {
                throw new Error('User not found.');
            }
            // await this.logUserActivity(userId, 'updated user details');
            return updatedUser;
        } catch (error) {
            throw new Error('Failed to update user profile.');
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('Failed to delete user.');
            }
            return deletedUser;
        } catch (error) {
            throw new Error('Failed to delete user.');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            throw new Error('User not found.');
        }
    }

    async getUserActivity(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            return user.activityLog;
        } catch (error) {
            throw new Error('Failed to get user activity.');
        }
    }

    async getUserFavorites(userId) {
        try {
            const user = await User.findById(userId).populate('favorites');
            if (!user) {
                throw new Error('User not found.');
            }
            return user.favorites;
        } catch (error) {
            throw new Error('Failed to get user favorites.');
        }
    }

    async changeUserPassword(userId, newPassword) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.password = newPassword;
            await user.save();
            await this.logUserActivity(userId, 'password changed');
            return { message: 'Password changed successfully.' };
        } catch (error) {
            throw new Error('Failed to change user password.');
        }
    }

    async logUserActivity(userId, action) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            user.activityLog.push({ action });
            await user.save();
        } catch (error) {
            throw new Error('Failed to log user activity.');
        }
    }

    async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found.');
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new Error('Invalid password.');
            }
            const token = jwt.sign({ user: user }, 'your-secret-key', { expiresIn: '1h' });
            user.token = token;
            await user.save();
            return { message: 'Login successful.', token };
        } catch (error) {
            throw new Error('Login failed.');
        }
    }
}

module.exports = UserServiceImpl;
