// Authentication middleware to protect routes
// This checks if a user is logged in before allowing access to protected routes

const ensureAuthenticated = (req, res, next) => {
  // req.isAuthenticated() is provided by Passport
  // It returns true if the user has a valid session
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware/route handler
    return next();
  }
  
  // User is not authenticated, return 401 Unauthorized
  return res.status(401).json({ 
    error: 'Unauthorized',
    message: 'You must be logged in to access this resource' 
  });
};

module.exports = { ensureAuthenticated };
