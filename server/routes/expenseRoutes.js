const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      date: -1,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const expense =
      await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const expense =
      await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const expense =
      await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense =
      await Expense.findByIdAndDelete(
        req.params.id
      );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
});

module.exports = router;