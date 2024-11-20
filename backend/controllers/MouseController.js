import Mouse from "../models/Mouse.js";

// Fetch all mice
export const getAllMice = async (req, res) => {
  try {
    const mice = await Mouse.find(); // Fetch all mice
    res.status(200).json(mice); // Return all mice with all the fields
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new mouse
export const addMouse = async (req, res) => {
  const {
    name, category, brand, price, imageCard, imageOverview, description, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, dpi, wireless, rgb, ergonomicDesign, programmableButtons, weightAdjustment, sensorType, pollingRate, batteryLife, wirelessRange, dragCoefficient, compatibility, dimensions, weight, waterproof
  } = req.body;

  const newMouse = new Mouse({
    name, category, brand, price, imageCard, imageOverview, description, amount, maxAmount, state, color, model, seller, sellerScore, deliveryTime, oftenBoughtWith, othersAlsoLookAt, dpi, wireless, rgb, ergonomicDesign, programmableButtons, weightAdjustment, sensorType, pollingRate, batteryLife, wirelessRange, dragCoefficient, compatibility, dimensions, weight, waterproof
  });

  try {
    await newMouse.save();
    res.status(201).json(newMouse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing mouse
export const updateMouse = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    brand,
    price,
    imageCard,
    imageOverview,
    description,
    specs,
  } = req.body;

  try {
    const updatedMouse = await Mouse.findByIdAndUpdate(
      id,
      {
        name,
        category,
        brand,
        price,
        imageCard,
        imageOverview,
        description,
        specs,
      },
      { new: true }
    );

    if (!updatedMouse) {
      return res.status(404).json({ message: "Mouse not found" });
    }

    res.status(200).json(updatedMouse); // Return the updated mouse object
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a mouse
export const deleteMouse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMouse = await Mouse.findByIdAndDelete(id);

    if (!deletedMouse) {
      return res.status(404).json({ message: "Mouse not found" });
    }

    res.status(200).json({ message: "Mouse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
