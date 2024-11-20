import Keyboard from "../models/Keyboard.js";
import mongoose from "mongoose";

// Get all keyboards
export const getAllKeyboards = async (req, res) => {
  try {
    const keyboards = await Keyboard.find({}).sort({ createdAt: -1 });
    res.status(200).json(keyboards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch keyboards" });
  }
};

// Get a single keyboard
export const getKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such keyboard" });
  }

  try {
    const keyboard = await Keyboard.findById(id);
    if (!keyboard) {
      return res.status(404).json({ error: "No such keyboard" });
    }
    res.status(200).json(keyboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the keyboard" });
  }
};

// Create a new keyboard
export const createKeyboard = async (req, res) => {
  const { name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, layout, connectionType, switchType, backlighting, rgbLighting, keycapMaterial, size, macroKeys, hotSwappable, batteryLife, numPad, adjustableFeet, pollingRate, onboardMemory, compatibility, waterproof, wirelessRange, weight, dimensions } = req.body;

  try {
    const keyboard = await Keyboard.create({ name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, layout, connectionType, switchType, backlighting, rgbLighting, keycapMaterial, size, macroKeys, hotSwappable, batteryLife, numPad, adjustableFeet, pollingRate, onboardMemory, compatibility, waterproof, wirelessRange, weight, dimensions });
    res.status(200).json(keyboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a keyboard
export const deleteKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such keyboard" });
  }

  try {
    const keyboard = await Keyboard.findOneAndDelete({ _id: id });
    if (!keyboard) {
      return res.status(400).json({ error: "No such keyboard" });
    }
    res.status(200).json(keyboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete keyboard" });
  }
};

// Update a keyboard
export const updateKeyboard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such keyboard" });
  }

  try {
    const keyboard = await Keyboard.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!keyboard) {
      return res.status(400).json({ error: "No such keyboard" });
    }
    res.status(200).json(keyboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to update keyboard" });
  }
};
