const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// ==========================================
// GET ALL PROJECTS
// GET /api/projects
// ==========================================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("client");

    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
      error: error.message
    });
  }
});

// ==========================================
// GET ONE PROJECT
// GET /api/projects/:id
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("client");

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch project",
      error: error.message
    });
  }
});

// ==========================================
// CREATE PROJECT
// POST /api/projects
// ==========================================
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);

    const populatedProject = await project.populate("client");

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    res.status(400).json({
      message: "Failed to create project",
      error: error.message
    });
  }
});

// ==========================================
// UPDATE PROJECT
// PUT /api/projects/:id
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate("client");

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json(project);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);

    res.status(400).json({
      message: "Failed to update project",
      error: error.message
    });
  }
});

// ==========================================
// DELETE PROJECT
// DELETE /api/projects/:id
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Failed to delete project",
      error: error.message
    });
  }
});

module.exports = router;