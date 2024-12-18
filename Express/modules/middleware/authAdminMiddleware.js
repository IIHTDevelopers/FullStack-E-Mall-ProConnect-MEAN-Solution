function adminMiddleware(req, res, next) {
    if (req.user.isAdmin === 1) {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden. Admin privileges required.' });
    }
}

module.exports = adminMiddleware;
