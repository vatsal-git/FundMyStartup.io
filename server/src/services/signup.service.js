const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: " Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: " Password must be 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup };
