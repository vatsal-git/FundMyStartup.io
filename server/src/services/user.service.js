const User = require("../models/user.model");

const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.json({ user });
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error occurred." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error occurred." });
  }
};

module.exports = { getUser, updateUser, deleteUser };
