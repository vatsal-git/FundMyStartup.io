const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { SECRET_KEY } = require("../config");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );

    return res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to sign in. Please try again.",
    });
  }
};

module.exports = { signin };
