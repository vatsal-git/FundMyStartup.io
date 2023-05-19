const Startup = require("../models/startup.model");

const createStartup = async (req, res) => {
  try {
    const newStartup = new Startup(req.body);

    await newStartup.save();

    res.status(201).json(newStartup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    let query = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      query = {
        $or: [
          { name: regex },
          { tags: regex },
          { founders: regex },
          { location: regex },
          { industry: regex },
        ],
      };
    }

    const startups = await Startup.find(query).populate("createdBy").exec();

    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStartupsCreatedBy = async (req, res) => {
  try {
    const { userId } = req.params;
    const { searchTerm } = req.query;

    let query = { createdBy: userId };

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      query.$or = [
        { name: regex },
        { tags: regex },
        { founders: regex },
        { location: regex },
        { industry: regex },
      ];
    }

    const startups = await Startup.find(query).populate("createdBy").exec();

    res.status(200).json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStartup = async (req, res) => {
  try {
    const { updatedBy, ...updatedData } = req.body;

    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ message: " Startup not found" });
    }

    Object.keys(updatedData).forEach(
      (key) => (startup[key] = updatedData[key])
    );
    startup.updatedBy = updatedBy;

    const updateStartup = await startup.save();

    res.status(200).json(updateStartup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStartup = async (req, res) => {
  try {
    const { id } = req.params;

    const startup = await Startup.findById(id);
    if (!startup) {
      return res.status(404).json({ message: " Startup not found" });
    }

    const deletedStartup = await startup.deleteOne();

    res.status(204).json(deletedStartup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStartup,
  getAllStartups,
  getAllStartupsCreatedBy,
  updateStartup,
  deleteStartup,
};
