const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
