const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: String,
      unique: true,
    },
    pass: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
