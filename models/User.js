const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTemplate = {
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
  },
};

const User = mongoose.model("User", new Schema(userTemplate));

module.exports = User;
