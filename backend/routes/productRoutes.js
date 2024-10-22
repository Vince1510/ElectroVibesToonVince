import express from 'express';
import { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET a single product
router.get('/:id', getProduct);

// POST a new product
router.post('/', createProduct);

// DELETE a product
router.delete('/:id', deleteProduct);

// PATCH a product
router.patch('/:id', updateProduct);

export default router;