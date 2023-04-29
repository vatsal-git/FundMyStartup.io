const Startup = require("../models/startup.model");
const User = require("../models/user.model");

const createStartup = async (req, res) => {
  const {
    name,
    description,
    location,
    industry,
    foundedOn,
    founders,
    teamSize,
    featuredImage,
    tags,
    website,
    funding,
    investors,
    galleryImages,
    createdBy,
  } = req.body;

  try {
    const newStartup = new Startup({
      name,
      description,
      createdBy,
      status: "open", //default status
      location,
      industry,
      foundedOn,
      founders,
      teamSize,
      featuredImage,
      tags,
      website,
      funding,
      investors,
      galleryImages,
    });

    const savedStartup = await newStartup.save();
    res
      .status(201)
      .json({ success: true, message: "Startup created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error: " + error.message });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find().exec();
    //get name from User table using createdBy(id) and add to startups
    const startupsWithUser = await Promise.all(
      startups.map(async (startup) => {
        const user = await User.findById(startup.createdBy).exec();
        return { ...startup._doc, createdBy: user.name };
      })
    );
    res.status(200).json({ success: true, startups: startupsWithUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error: " + error.message });
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
