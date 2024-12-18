const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        req.user = decodedToken.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;