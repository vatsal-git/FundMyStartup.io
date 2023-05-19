const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
    trim: true,
  },
  role: {
    type: String,
    enum: {
      values: ["ENTREPRENEUR", "INVESTOR"],
      message: "Role must be either 'ENTREPRENEUR' or 'INVESTOR'.",
    },
    required: [true, "Role is required."],
  },
  location: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/i.test(v);
      },
      message: "Please enter a valid phone number.",
    },
  },
  avatar: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(https?|data:image\/[a-z]+;base64)/i.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid URL or base64 image data`,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
