const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
