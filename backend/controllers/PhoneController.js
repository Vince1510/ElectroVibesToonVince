import Phone from '../models/Phone.js';
import mongoose from 'mongoose';

// Get all phones
export const getAllPhones = async (req, res) => {
  const phones = await Phone.find({}).sort({ createdAt: -1 });
  res.status(200).json(phones);
};

// Get a single phone
export const getPhone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such phone' });
  }

  const phone = await Phone.findById(id);

  if (!phone) {
    return res.status(404).json({ error: 'No such phone' });
  }

  res.status(200).json(phone);
};

// Create a new phone
export const createPhone = async (req, res) => {
  const { name, code, description, brand, price, imageCard, imageOverview, operatingSystem, screenSize, screenResolution, screenTechnology, refreshRate, processor, ram, storage, expandableStorage, rearCamera, frontCamera, cameraFeatures, batteryCapacity, chargingSpeed, wirelessCharging, simType, network, connectivityFeatures, waterproof, fingerprintSensor, faceRecognition, colorOptions, weight, dimensions } = req.body;

  try {
    const phone = await Phone.create({ name, code, description, brand, price, imageCard, imageOverview, operatingSystem, screenSize, screenResolution, screenTechnology, refreshRate, processor, ram, storage, expandableStorage, rearCamera, frontCamera, cameraFeatures, batteryCapacity, chargingSpeed, wirelessCharging, simType, network, connectivityFeatures, waterproof, fingerprintSensor, faceRecognition, colorOptions, weight, dimensions });
    res.status(200).json(phone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a phone
export const deletePhone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such phone' });
  }

  const phone = await Phone.findOneAndDelete({ _id: id });

  if (!phone) {
    return res.status(400).json({ error: 'No such phone' });
  }

  res.status(200).json(phone);
};

// Update a phone
export const updatePhone = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such phone' });
  }

  const phone = await Phone.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!phone) {
    return res.status(400).json({ error: 'No such phone' });
  }

  res.status(200).json(phone);
};
