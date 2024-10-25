import express from 'express';
import { getAllPhones, getPhone, createPhone, deletePhone, updatePhone } from '../controllers/PhoneController.js';

const router = express.Router();

// GET all phones
router.get('/', getAllPhones);

// GET a single phone
router.get('/:id', getPhone);

// POST a new phone
router.post('/', createPhone);

// DELETE a phone
router.delete('/:id', deletePhone);

// PATCH a phone
router.patch('/:id', updatePhone);

export default router;
