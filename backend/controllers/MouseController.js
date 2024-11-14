// controllers/MouseController.js

import Mouse from "../models/Mouse.js";
import mongoose from "mongoose";

// Get all mice
export const getAllMice = async (req, res) => {
  const mice = await Mouse.find({}).sort({ createdAt: -1 });
  res.status(200).json(mice);
};

// Get a single mouse
export const getMouse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such mouse" });
  }

  const mouse = await Mouse.findById(id);

  if (!mouse) {
    return res.status(404).json({ error: "No such mouse" });
  }

  res.status(200).json(mouse);
};

// Create a new mouse
export const createMouse = async (req, res) => {
  const {
    name,
    brand,
    price,
    imageUrl,
    dpi,
    connectionType,
    batteryLife,
    weight,
    dimensions,
    colorOptions,
    features,
  } = req.body;

  try {
    const mouse = await Mouse.create({
      name,
      brand,
      price,
      imageUrl,
      dpi,
      connectionType,
      batteryLife,
      weight,
      dimensions,
      colorOptions,
      features,
    });
    res.status(200).json(mouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a mouse
export const deleteMouse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such mouse" });
  }

  const mouse = await Mouse.findOneAndDelete({ _id: id });

  if (!mouse) {
    return res.status(400).json({ error: "No such mouse" });
  }

  res.status(200).json(mouse);
};

// Update a mouse
export const updateMouse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such mouse" });
  }

  const mouse = await Mouse.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!mouse) {
    return res.status(400).json({ error: "No such mouse" });
  }

  res.status(200).json(mouse);
};
