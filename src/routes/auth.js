const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Route 1: Login route - redirects to GitHub
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// Route 2: GitHub login process
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Route 3: GitHub callback URL
// After user logs in on GitHub, GitHub redirects here with the authorization code
// Passport exchanges the code for an access token and user profile
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication - redirect to home to see logged in status
    res.redirect('/');
  }
);

// Route 3: Logout route
// req.logout() destroys the session, logging the user out
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Route 4: Check authentication status
// Returns whether the current user is logged in
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      authenticated: true, 
      user: {
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
