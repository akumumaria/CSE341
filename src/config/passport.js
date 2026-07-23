const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback'
},
  function(accessToken, refreshToken, profile, done) {
    // This function is called after GitHub successfully authenticates the user
    // 'profile' contains user information from GitHub (username, email, etc.)
    // In a real app, you would save this to a database here
    // For now, we'll just return the profile
    return done(null, profile);
  }
));

// Serialize user: store user ID in session
// This determines what data gets stored in the session cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user: retrieve user from session data
// This converts the session data back into a user object for each request
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
