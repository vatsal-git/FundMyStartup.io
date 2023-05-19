const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name should be at least 2 characters"],
      maxlength: [50, "Name should be at most 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description should be at least 10 characters"],
      maxlength: [5000, "Description should be at most 5000 characters"],
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
      required: [true, "Status is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [2, "Location should be at least 2 characters"],
      maxlength: [50, "Location should be at most 50 characters"],
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
      minlength: [2, "Industry should be at least 2 characters"],
      maxlength: [50, "Industry should be at most 50 characters"],
    },
    foundedOn: {
      type: Date,
      required: [true, "Founded on is required"],
    },
    founders: {
      type: [String],
      required: [true, "Founders is required"],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "Founders array should contain 1 to 5 members",
      },
    },
    teamSize: {
      type: Number,
      required: [true, "Team size is required"],
      min: [1, "Team size should be at least 1"],
      max: [1000, "Team size should be at most 1000"],
    },
    featuredImage: {
      type: String,
      required: [true, "Featured image is required"],
    },
    tags: {
      type: [String],
      required: [true, "Tags is required"],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 10;
        },
        message: "Tags array should contain 1 to 10 tags",
      },
    },
    website: {
      type: String,
      trim: true,
      maxlength: [200, "Website should be at most 200 characters"],
    },
    funding: {
      type: Number,
      min: [0, "Funding should be at least 0"],
      max: [1000000000, "Funding should be at most 1000000000"],
    },
    investors: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: "Investors array should contain at most 10 members",
      },
    },
    galleryImages: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message:
          "Gallery images array should contain minimum 1 or maximum 10 images",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Startup", startupSchema);
