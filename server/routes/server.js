const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const clientRoutes = require("./routes/clientRoutes");
const projectRoutes = require("./routes/projectRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Construction Management API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});