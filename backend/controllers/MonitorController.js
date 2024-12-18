import Monitor from "../models/Monitor.js";
import mongoose from "mongoose";

// Fetch all monitors
export const getAllMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find();
    res.status(200).json(monitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single keyboard
export const getMonitor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Monitor" });
  }

  try {
    const monitor = await Monitor.findById(id);
    if (!monitor) {
      return res.status(404).json({ error: "No such Monitor" });
    }
    res.status(200).json(monitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new monitor
export const addMonitor = async (req, res) => {
  const {
    name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, resolution, size, refreshRate, panelType, aspectRatio, brightness, contrastRatio, curved, responseTime, colorGamut, hdrSupport, hdrStandard, viewingAngle, connectivityPorts, usbPorts, hdmiVersion, displayPortVersion, audioOutput, builtInSpeakers, heightAdjustable, swivel, tilt, pivot, vesaMount, blueLightFilter, flickerFree, energyRating, weight, dimensions
  } = req.body;

  const newMonitor = new Monitor({
    name, description, largeDescription, brand, category, price, dealPrice, imageCard, imageOverview, commercial, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, resolution, size, refreshRate, panelType, aspectRatio, brightness, contrastRatio, curved, responseTime, colorGamut, hdrSupport, hdrStandard, viewingAngle, connectivityPorts, usbPorts, hdmiVersion, displayPortVersion, audioOutput, builtInSpeakers, heightAdjustable, swivel, tilt, pivot, vesaMount, blueLightFilter, flickerFree, energyRating, weight, dimensions
  });

  try {
    await newMonitor.save();
    res.status(201).json(newMonitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing monitor
export const updateMonitor = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    code,
    description,
    brand,
    price,
    imageCard,
    imageOverview,
    specs,
  } = req.body;

  try {
    const updatedMonitor = await Monitor.findByIdAndUpdate(
      id,
      {
        name,
        code,
        description,
        brand,
        price,
        imageCard,
        imageOverview,
        specs,
      },
      { new: true }
    );

    if (!updatedMonitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    res.status(200).json(updatedMonitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a monitor
export const deleteMonitor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMonitor = await Monitor.findByIdAndDelete(id);

    if (!deletedMonitor) {
      return res.status(404).json({ message: "Monitor not found" });
    }

    res.status(200).json({ message: "Monitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
