// MonitorController.js
import Monitor from "../models/Monitor.js";
import mongoose from "mongoose";

// Get all monitors
export const getAllMonitors = async (req, res) => {
  const monitors = await Monitor.find({}).sort({ createdAt: -1 });
  res.status(200).json(monitors);
};

// Get a single monitor
export const getMonitor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such monitor" });
  }

  const monitor = await Monitor.findById(id);

  if (!monitor) {
    return res.status(404).json({ error: "No such monitor" });
  }

  res.status(200).json(monitor);
};

// Create a new monitor
export const createMonitor = async (req, res) => {
  const {
    name,
    code,
    description,
    brand,
    price,
    imageUrl,
    screenSize,
    screenResolution,
    screenTechnology,
    refreshRate,
    responseTime,
    panelType,
    aspectRatio,
    brightness,
    contrastRatio,
    colorSupport,
    ports,
    wireless,
    adjustableStand,
    vesaMount,
    speakers,
    weight,
    dimensions,
  } = req.body;

  try {
    const monitor = await Monitor.create({
      name,
      code,
      description,
      brand,
      price,
      imageUrl,
      screenSize,
      screenResolution,
      screenTechnology,
      refreshRate,
      responseTime,
      panelType,
      aspectRatio,
      brightness,
      contrastRatio,
      colorSupport,
      ports,
      wireless,
      adjustableStand,
      vesaMount,
      speakers,
      weight,
      dimensions,
    });
    res.status(200).json(monitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a monitor
export const deleteMonitor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such monitor" });
  }

  const monitor = await Monitor.findOneAndDelete({ _id: id });

  if (!monitor) {
    return res.status(400).json({ error: "No such monitor" });
  }

  res.status(200).json(monitor);
};

// Update a monitor
export const updateMonitor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such monitor" });
  }

  const monitor = await Monitor.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!monitor) {
    return res.status(400).json({ error: "No such monitor" });
  }

  res.status(200).json(monitor);
};
