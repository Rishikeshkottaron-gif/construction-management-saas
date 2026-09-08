const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// --------------------------------------------------
// GET ALL ATTENDANCE
// --------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employee")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    console.error("GET attendance error:", error);

    res.status(500).json({
      message: "Failed to load attendance",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// GET ATTENDANCE FOR A PARTICULAR DATE
// --------------------------------------------------
router.get("/date/:date", async (req, res) => {
  try {
    const selectedDate = new Date(req.params.date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const attendance = await Attendance.find({
      date: {
        $gte: start,
        $lte: end,
      },
    }).populate("employee");

    res.json(attendance);
  } catch (error) {
    console.error("GET attendance by date error:", error);

    res.status(500).json({
      message: "Failed to load attendance",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// CREATE OR UPDATE ATTENDANCE
// --------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const {
      employee,
      date,
      status,
      dayType,
      notes,
    } = req.body;

    if (!employee) {
      return res.status(400).json({
        message: "Employee is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Present or Absent",
      });
    }

    if (!["Full Day", "Half Day"].includes(dayType)) {
      return res.status(400).json({
        message: "Day type must be Full Day or Half Day",
      });
    }

    // Make sure employee exists
    const employeeExists = await Employee.findById(employee);

    if (!employeeExists) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    selectedDate.setHours(0, 0, 0, 0);

    // If attendance already exists, update it.
    // Otherwise create a new record.
    const attendance = await Attendance.findOneAndUpdate(
      {
        employee,
        date: selectedDate,
      },
      {
        employee,
        date: selectedDate,
        status,
        dayType,
        notes: notes || "",
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    ).populate("employee");

    res.status(200).json({
      message: "Attendance saved successfully",
      attendance,
    });
  } catch (error) {
    console.error("POST attendance error:", error);

    res.status(500).json({
      message: "Failed to save attendance",
      error: error.message,
    });
  }
});

// --------------------------------------------------
// DELETE ATTENDANCE
// --------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(
      req.params.id
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    console.error("DELETE attendance error:", error);

    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
});

module.exports = router;