import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the encrypted token string from the header parameters
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the payload using your secret verification key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user profile data matching the ID, excluding the password hash
      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no login token provided' });
  }
};

// Admin validation checker gate middleware block
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Store Administrators only.' });
  }
};
