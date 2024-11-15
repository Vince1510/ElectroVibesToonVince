import Monitor from "../models/Monitor.js";

// Fetch all monitors
export const getAllMonitors = async (req, res) => {
  try {
    const monitors = await Monitor.find();
    res.status(200).json(monitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new monitor
export const addMonitor = async (req, res) => {
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
  const newMonitor = new Monitor({
    name,
    code,
    description,
    brand,
    price,
    imageCard,
    imageOverview,
    specs,
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
