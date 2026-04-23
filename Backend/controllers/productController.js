import product from '../models/productSchema.js';
import mongoose from 'mongoose';

// Get all products with optional query filters
const getAllProducts = async (req, res) => {
  try {
    const { type, pname } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (pname) filter.pname = new RegExp(pname, 'i'); // case-insensitive partial match

    const products = await product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Get a product by ID
const getProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const foundProduct = await product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Add a new product
const createProduct = async (req, res) => {
  try {
    const { pname, type, price, basePrice, description, quantity, image } = req.body;

    const newProduct = new product({
      pname,
      type,
      price,
      basePrice,
      description,
      quantity,
      image
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const updated = await product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

// Remove a product
const removeProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    const deleted = await product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

const getProductTypes = async (req, res) => {
  try {
    const types = await product.distinct("type");
    res.status(200).json(types);
  } catch (error) {
    console.error("Error fetching product types:", error);
    res.status(500).json({ message: "Failed to fetch product types", error: error.message });
  }
};

export { getAllProducts, getProduct, createProduct, removeProduct, updateProduct , getProductTypes};
