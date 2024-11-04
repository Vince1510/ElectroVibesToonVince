import Laptop from '../models/Laptop.js';
import mongoose from 'mongoose';

// Get all laptops
export const getAllLaptops = async (req, res) => {
  const laptops = await Laptop.find({}).sort({ createdAt: -1 });
  res.status(200).json(laptops);
};

// Get a single laptop
export const getLaptop = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such laptop' });
  }

  const laptop = await Laptop.findById(id);

  if (!laptop) {
    return res.status(404).json({ error: 'No such laptop' });
  }

  res.status(200).json(laptop);
};

// Create a new laptop
export const createLaptop = async (req, res) => {
  const { name, code, description, brand, price, imageUrl, operatingSystem, screenSize, screenResolution, screenTechnology, processor, ram, storage, expandableStorage, gpu, refreshRate, touchScreen, batteryCapacity, batteryLife, chargingSpeed, connectivityPorts, wifiSupport, bluetoothVersion, weight, dimensions, colorOptions, fingerprintSensor, webcam } = req.body;

  try {
    const laptop = await Laptop.create({ name, code, description, brand, price, imageUrl, operatingSystem, screenSize, screenResolution, screenTechnology, processor, ram, storage, expandableStorage, gpu, refreshRate, touchScreen, batteryCapacity, batteryLife, chargingSpeed, connectivityPorts, wifiSupport, bluetoothVersion, weight, dimensions, colorOptions, fingerprintSensor, webcam });
    res.status(200).json(laptop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a laptop
export const deleteLaptop = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such laptop' });
  }

  const laptop = await Laptop.findOneAndDelete({ _id: id });

  if (!laptop) {
    return res.status(400).json({ error: 'No such laptop' });
  }

  res.status(200).json(laptop);
};

// Update a laptop
export const updateLaptop = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such laptop' });
  }

  const laptop = await Laptop.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!laptop) {
    return res.status(400).json({ error: 'No such laptop' });
  }

  res.status(200).json(laptop);
};
