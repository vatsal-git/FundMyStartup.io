const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    foundedOn: {
      type: Date,
      required: true,
    },
    founders: {
      type: [String],
      required: true,
    },
    teamSize: {
      type: Number,
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    website: {
      type: String,
    },
    funding: {
      type: Number,
    },
    investors: {
      type: [String],
    },
    galleryImages: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Startup", startupSchema);
