const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./src/database/connect');
const contactsRoutes = require('./src/routes/contacts');
const productsRoutes = require('./src/routes/products');

// Import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'CSE341 API is running' });
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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