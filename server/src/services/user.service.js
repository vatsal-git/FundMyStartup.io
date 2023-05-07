const User = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Deleted startup successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
};

module.exports = { getUser, getUserById, updateUser, deleteUser };
