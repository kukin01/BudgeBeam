const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select('-password');

    if(!currentUser) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, authorization denied' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = authMiddleware;