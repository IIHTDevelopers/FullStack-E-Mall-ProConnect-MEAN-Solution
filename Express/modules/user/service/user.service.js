class UserService {
    async createUser(userData) { }
    async getUserProfile(userId) { }
    async updateUserProfile(userId, updatedProfile) { }
    async deleteUser(userId) { }
    async getUserByEmail(email) { }
    async getUserActivity(userId) { }
    async getUserFavorites(userId) { }
    async changeUserPassword(userId, newPassword) { }
    async loginUser(email, password) { }
}

module.exports = UserService;
