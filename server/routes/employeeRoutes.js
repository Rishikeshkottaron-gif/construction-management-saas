const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json(employees);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message
    });
  }
});

// GET one employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message
    });
  }
});

// CREATE employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to create employee",
      error: error.message
    });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json(employee);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to update employee",
      error: error.message
    });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.json({
      message: "Employee deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message
    });
  }
});

module.exports = router;