const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // store image URL or public path
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["veg", "nonveg"],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Menu", menuSchema);
