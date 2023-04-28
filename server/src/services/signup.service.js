const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const { email, password, name, userType, location, phoneNumber, role } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      userType,
      location,
      phoneNumber,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { signup };
