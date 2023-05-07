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
    status,
    tags,
    website,
    funding,
    investors,
    galleryImages,
  } = req.body;

  try {
    const newStartup = new Startup({
      name,
      description,
      createdBy: req.user._id,
      status: status ?? "OPEN", //default status
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
    res.status(201).json({
      success: true,
      message: "Startup created successfully",
      savedStartup,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error. Error: " + error,
      });
  }
};

const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find().exec();
    const startupsWithUser = await Promise.all(
      startups.map(async (startup) => {
        const user = await User.findById(startup.createdBy).exec();
        return { ...startup._doc, createdBy: user };
      })
    );
    res.status(200).json({ success: true, startups: startupsWithUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllStartupsCreatedBy = async (req, res) => {
  const { userId } = req.params;
  try {
    const startups = await Startup.find({ createdBy: userId }).exec();
    const startupsWithUser = await Promise.all(
      startups.map(async (startup) => {
        const user = await User.findById(startup.createdBy).exec();
        return { ...startup._doc, createdBy: user };
      })
    );
    res.status(200).json({ success: true, startups: startupsWithUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res
        .status(404)
        .json({ success: false, message: "Startup not found" });
    }
    const { updatedBy, ...updatedData } = req.body;
    Object.keys(updatedData).forEach((key) => {
      startup[key] = updatedData[key];
    });
    startup.updatedBy = updatedBy;
    const updateStartup = await startup.save();
    res.status(200).json({ success: true, updateStartup });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

const deleteStartup = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res
        .status(404)
        .json({ success: false, message: "Startup not found" });
    }
    await startup.deleteOne();
    res
      .status(204)
      .json({ success: true, message: "Deleted startup successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
};

module.exports = {
  createStartup,
  getAllStartups,
  getAllStartupsCreatedBy,
  updateStartup,
  deleteStartup,
};
