const express = require("express");
const Material = require("../models/Material");

const router = express.Router();

// GET all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find().sort({
      createdAt: -1,
    });

    res.json(materials);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch materials",
      error: error.message,
    });
  }
});

// GET one material
router.get("/:id", async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    res.json(material);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch material",
      error: error.message,
    });
  }
});

// CREATE material
router.post("/", async (req, res) => {
  try {
    const material = await Material.create(req.body);

    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create material",
      error: error.message,
    });
  }
});

// UPDATE material
router.put("/:id", async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    res.json(material);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update material",
      error: error.message,
    });
  }
});

// DELETE material
router.delete("/:id", async (req, res) => {
  try {
    const material =
      await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    res.json({
      message: "Material deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete material",
      error: error.message,
    });
  }
});

module.exports = router;