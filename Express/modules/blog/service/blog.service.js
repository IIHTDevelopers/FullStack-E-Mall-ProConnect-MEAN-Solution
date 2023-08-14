class BlogService {
    async createBlog(blogData) { }
    async getBlog(blogId) { }
    async updateBlog(blogId, updatedBlog) { }
    async deleteBlog(blogId) { }
    async getAllBlogs() { }
    async getPopularBlogs() { }
    async addComment(blogId, comment) { }
    async editComment(blogId, commentId, updatedComment) { }
    async deleteComment(blogId, commentId) { }
    async getCategories() { }
    async likeBlog(blogId) { }
    async getCommentCount(blogId) { }
}

module.exports = BlogService;
