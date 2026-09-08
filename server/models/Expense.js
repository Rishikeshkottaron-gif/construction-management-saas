const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    project: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);