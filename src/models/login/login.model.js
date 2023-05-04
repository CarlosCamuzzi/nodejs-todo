const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
});

const LoginSchema = mongoose.model("Login", loginSchema);

module.exports = LoginSchema;
