const express = require("express");

function createCrudRouter(Model) {
  const router = express.Router();

  // GET ALL
  router.get("/", async (req, res) => {
    try {
      const records = await Model.find().sort({ createdAt: -1 });

      res.json(records);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to fetch records",
        error: error.message,
      });
    }
  });

  // GET ONE
  router.get("/:id", async (req, res) => {
    try {
      const record = await Model.findById(req.params.id);

      if (!record) {
        return res.status(404).json({
          message: "Record not found",
        });
      }

      res.json(record);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch record",
        error: error.message,
      });
    }
  });

  // CREATE
  router.post("/", async (req, res) => {
    try {
      const record = await Model.create(req.body);

      res.status(201).json(record);
    } catch (error) {
      console.error(error);

      res.status(400).json({
        message: "Failed to create record",
        error: error.message,
      });
    }
  });

  // UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const record = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!record) {
        return res.status(404).json({
          message: "Record not found",
        });
      }

      res.json(record);
    } catch (error) {
      res.status(400).json({
        message: "Failed to update record",
        error: error.message,
      });
    }
  });

  // DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const record = await Model.findByIdAndDelete(req.params.id);

      if (!record) {
        return res.status(404).json({
          message: "Record not found",
        });
      }

      res.json({
        message: "Record deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete record",
        error: error.message,
      });
    }
  });

  return router;
}

module.exports = createCrudRouter;