const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    //after bearer  
    const token = header && header.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized token empty' });
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error.message });
    }
};
