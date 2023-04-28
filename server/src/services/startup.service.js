const Startup = require("../models/startup.model");

const createStartup = async (req, res) => {
  try {
    const startup = new Startup({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id, // Set the user ID to the current user
      status: req.body.status || "open",
      createdBy: req.user.userId,
    });

    const savedStartup = await startup.save();

    res.status(201).json(savedStartup);
  } catch (error) {
    res.status(500).json({ message: "Error creating startup" });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find().exec();

    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ message: "Error getting startups" });
  }
};

const getStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.status(200).json(startup);
  } catch (error) {
    res.status(500).json({ message: "Error getting startup" });
  }
};

const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    if (startup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    startup.name = req.body.name;
    startup.description = req.body.description;

    const savedStartup = await startup.save();

    res.status(200).json(savedStartup);
  } catch (error) {
    res.status(500).json({ message: "Error updating startup" });
  }
};

const deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    if (startup.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await startup.remove();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting startup" });
  }
};

module.exports = {
  createStartup,
  getAllStartups,
  getStartup,
  updateStartup,
  deleteStartup,
};
