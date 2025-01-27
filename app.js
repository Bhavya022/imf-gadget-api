const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db"); // Import the Sequelize database instance

const gadgetRoutes = require("./routes/gadgetRoutes");
const { authenticate } = require("./middleware/auth");
const { logger } = require("./middleware/loggerMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/gadgets", gadgetRoutes);

// Health Check Endpoint
app.get("/", async (req, res) => {
  try {
    // Check if the database connection works
    await db.authenticate(); // Sequelize method to test the database connection
    res.status(200).json({
      message: "Server is running and database is connected!",
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      message: "Server is running, but database connection failed!",
      error: error.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "The resource you are looking for does not exist." });
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
