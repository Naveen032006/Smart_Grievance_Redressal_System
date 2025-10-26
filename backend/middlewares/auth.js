import jwt from 'jsonwebtoken';

/**
 * Middleware 1: Checks for a valid token (any user)
 * This verifies the token and attaches the user's info (id, role) to req.user
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    // Get token from header
    const token = authHeader.split(' ')[1];

    // Verify token and get payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user payload (which is { id: '...', role: '...' }) to the request
    req.user = decoded.user; 
    
    // Move to the next function
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};


/**
 * Middleware 2: Checks for Admin role
 * This *must* run AFTER authMiddleware. It checks the req.user object.
 */
const adminOnlyMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Forbidden: Admin access only' });
  }
};

// Export both functions
export { authMiddleware, adminOnlyMiddleware };