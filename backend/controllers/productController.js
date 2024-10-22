import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Get all products
export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

// Get a single product
export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, code, description, category, price, imageUrl, brand, platform, screenSize, screenResolution, screenTechnology, touchScreen, refreshRate, adaptiveSync, speakers, connectors, processor, memory, storage, graphicsCard, dpi, connection, handType, keyboardLayout, keyboardLights, ergonomicDesign, switches } = req.body;

  try {
    const product = await Product.create({ name, code, description, category, price, imageUrl, brand, platform, screenSize, screenResolution, screenTechnology, touchScreen, refreshRate, adaptiveSync, speakers, connectors, processor, memory, storage, graphicsCard, dpi, connection, handType, keyboardLayout, keyboardLights, ergonomicDesign, switches });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such product' });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(400).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such product' });
  }

  const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!product) {
    return res.status(400).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};
