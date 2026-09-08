const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,
      default: "pcs",
    },

    price: {
      type: Number,
      default: 0,
    },

    supplier: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);