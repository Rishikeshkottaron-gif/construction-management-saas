const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const Project = require("./models/Project");
const Client = require("./models/Client");
const Employee = require("./models/Employee");
const Task = require("./models/Task");
const Material = require("./models/Material");
const Supplier = require("./models/Supplier");
const Expense = require("./models/Expense");
const Payment = require("./models/Payment");
const Attendance = require("./models/Attendance");

const createCrudRouter = require("./routes/crudRouter");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// API routes
app.use("/api/projects", createCrudRouter(Project));
app.use("/api/clients", createCrudRouter(Client));
app.use("/api/employees", createCrudRouter(Employee));
app.use("/api/tasks", createCrudRouter(Task));
app.use("/api/materials", createCrudRouter(Material));
app.use("/api/suppliers", createCrudRouter(Supplier));
app.use("/api/expenses", createCrudRouter(Expense));
app.use("/api/payments", createCrudRouter(Payment));
app.use("/api/attendance", createCrudRouter(Attendance));

// API health check
app.get("/api", (req, res) => {
  res.json({
    message: "Construction Management API is running",
    status: "online",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Construction Management Server",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
});

// Start
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();