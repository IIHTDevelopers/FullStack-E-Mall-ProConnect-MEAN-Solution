const UserServiceImpl = require('../service/impl/user.serviceImpl');

const userService = new UserServiceImpl();

class UserController {
    async createUser(req, res) {
        try {
            const { username, email, password, profile } = req.body;
            if (!username || !email || !password || !profile) {
                return res.status(400).json({ error: 'Missing required fields.' });
            }
            try {
                await userService.getUserByEmail(email);
                // if (existingUser) {
                return res.status(400).json({ error: 'Email address is already in use.' });
                // }
                // const newUser = await userService.createUser({ username, email, password, profile });
                // res.status(201).json(newUser);
            } catch (err) {
                const newUser = await userService.createUser({ username, email, password, profile });
                res.status(201).json(newUser);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to create user.', message: JSON.stringify(err) });
        }
    };

    async getUserProfile(req, res) {
        try {
            const user = await userService.getUserProfile(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: 'User not found.' });
        }
    };

    async updateUserProfile(req, res) {
        try {
            const updatedUser = await userService.updateUserProfile(req.params.id, req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(404).json({ error: 'User not found.' });
        }
    };

    async deleteUser(req, res) {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);
            res.json(deletedUser);
        } catch (error) {
            res.status(404).json({ error: 'User not found.' });
        }
    };

    async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve user by email.' });
        }
    }

    async getUserActivity(req, res) {
        try {
            const userId = req.params.id;
            const userActivity = await userService.getUserActivity(userId);
            res.json(userActivity);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve user activity.' });
        }
    };

    async getUserFavorites(req, res) {
        try {
            const userId = req.params.id;
            const userFavorites = await userService.getUserFavorites(userId);
            res.json(userFavorites);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve user favorites.' });
        }
    };

    async changeUserPassword(req, res) {
        try {
            const userId = req.params.id;
            const newPassword = req.body.newPassword;
            if (!newPassword) {
                return res.status(400).json({ error: 'New password is required.' });
            }
            const result = await userService.changeUserPassword(userId, newPassword);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to change user password.' });
        }
    };

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const result = await userService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: 'Login failed.' });
        }
    };
}

module.exports = UserController;
