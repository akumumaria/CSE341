const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

// Load environment variables first
dotenv.config();

const passport = require('./src/config/passport');
const { connectToDatabase } = require('./src/database/connect');
const contactsRoutes = require('./src/routes/contacts');
const productsRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');

// Import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Root route - serves HTML with login/logout buttons
app.get('/', (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  const username = isAuthenticated ? req.user.username : null;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>CSE341 API</title>
    </head>
    <body>
      <h1>CSE341 API</h1>
      
      ${isAuthenticated ? `
        <p>You are logged in as: ${username}</p>
        <a href="/auth/logout">Logout</a>
      ` : `
        <p>You are not logged in</p>
        <a href="/auth/login">Login with GitHub</a>
      `}
      
      <br><br>
      <a href="/api-docs">API Documentation</a>
    </body>
    </html>
  `;
  
  res.send(html);
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Authentication routes
app.use('/auth', authRoutes);

// Routes for both collections
app.use('/contacts', contactsRoutes);
app.use('/products', productsRoutes);

// Start server
const start = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

start();