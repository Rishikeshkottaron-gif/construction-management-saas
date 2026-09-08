const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      default: "",
    },

    client: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    method: {
      type: String,
      default: "Bank Transfer",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Partial"],
      default: "Paid",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);