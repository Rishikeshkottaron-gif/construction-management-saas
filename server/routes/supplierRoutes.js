const express = require("express");
const Supplier = require("../models/Supplier");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({
      createdAt: -1,
    });

    res.json(suppliers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch suppliers",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const supplier =
      await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch supplier",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const supplier =
      await Supplier.create(req.body);

    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create supplier",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const supplier =
      await Supplier.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.json(supplier);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update supplier",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const supplier =
      await Supplier.findByIdAndDelete(
        req.params.id
      );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete supplier",
      error: error.message,
    });
  }
});

module.exports = router;