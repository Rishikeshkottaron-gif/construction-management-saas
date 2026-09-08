const express = require("express");
const Client = require("../models/Client");

const router = express.Router();

// GET all clients
router.get("/", async (req, res) => {
  console.log("GET /api/clients was received");

  try {
    const clients = await Client.find();

    res.json(clients);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch clients",
      error: error.message
    });
  }
});

// GET one client
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    res.json(client);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch client",
      error: error.message
    });
  }
});

// CREATE client
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to create client",
      error: error.message
    });
  }
});

// UPDATE client
router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    res.json(client);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Failed to update client",
      error: error.message
    });
  }
});

// DELETE client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found"
      });
    }

    res.json({
      message: "Client deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete client",
      error: error.message
    });
  }
});

module.exports = router;