const Product = require('../models/product');

// Get all products
const getAllProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
};

// Get product by ID
const getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw error;
  }
};

// Create new product
const createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw error;
  }
};

// Update product
const updateProduct = async (id, productData) => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { 
      new: true,
      runValidators: true 
    });
  } catch (error) {
    throw error;
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};