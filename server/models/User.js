const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rollNo: {
      type: String,
      unique: true,
      sparse: true, // allows admin to not have rollNo
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
