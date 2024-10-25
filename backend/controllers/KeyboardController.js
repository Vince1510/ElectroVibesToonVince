import Keyboard from '../models/Keyboard.js';
import mongoose from 'mongoose';

// Get all keyboards
export const getAllKeyboards = async (req, res) => {
  const keyboards = await Keyboard.find({}).sort({ createdAt: -1 });
  res.status(200).json(keyboards);
};

// Get a single keyboard
export const getKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such keyboard' });
  }

  const keyboard = await Keyboard.findById(id);

  if (!keyboard) {
    return res.status(404).json({ error: 'No such keyboard' });
  }

  res.status(200).json(keyboard);
};

// Create a new keyboard
export const createKeyboard = async (req, res) => {
  const { name, code, description, brand, price, imageUrl, layout, connectionType, switchType, backlighting, rgbLighting, keycapMaterial, size, macroKeys, hotSwappable, batteryLife, colorOptions, weight, dimensions } = req.body;

  try {
    const keyboard = await Keyboard.create({ name, code, description, brand, price, imageUrl, layout, connectionType, switchType, backlighting, rgbLighting, keycapMaterial, size, macroKeys, hotSwappable, batteryLife, colorOptions, weight, dimensions });
    res.status(200).json(keyboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a keyboard
export const deleteKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such keyboard' });
  }

  const keyboard = await Keyboard.findOneAndDelete({ _id: id });

  if (!keyboard) {
    return res.status(400).json({ error: 'No such keyboard' });
  }

  res.status(200).json(keyboard);
};

// Update a keyboard
export const updateKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such keyboard' });
  }

  const keyboard = await Keyboard.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!keyboard) {
    return res.status(400).json({ error: 'No such keyboard' });
  }

  res.status(200).json(keyboard);
};
