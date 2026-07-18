const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Validation rules for Product
const validateProduct = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Name must be a string'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than 0'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),
  body('stock')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
  body('sku')
    .notEmpty()
    .withMessage('SKU is required')
    .isString()
    .withMessage('SKU must be a string'),
  body('brand')
    .notEmpty()
    .withMessage('Brand is required')
    .isString()
    .withMessage('Brand must be a string'),
];

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve products',
      message: error.message 
    });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve product',
      message: error.message 
    });
  }
});

// POST create new product
router.post('/', validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
  }

  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create product',
      message: error.message 
    });
  }
});

// PUT update product
router.put('/:id', validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
  }

  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update product',
      message: error.message 
    });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: error.message 
    });
  }
});

module.exports = router;