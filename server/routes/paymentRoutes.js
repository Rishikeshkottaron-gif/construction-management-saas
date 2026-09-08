const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({
      paymentDate: -1,
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment =
      await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch payment",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const payment =
      await Payment.create(req.body);

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create payment",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payment =
      await Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update payment",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payment =
      await Payment.findByIdAndDelete(
        req.params.id
      );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({
      message: "Payment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete payment",
      error: error.message,
    });
  }
});

module.exports = router;