const express = require("express");
const { sequelize, connectDB } = require("./config/db"); 
const Gadget = require("./models/Gadget"); 
const { authenticate } = require("./middleware/auth"); 
const gadgetRoutes = require("./routes/gadgetRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use("/api/gadgets",authenticate, gadgetRoutes);
app.use("/api/auth", authRoutes);
connectDB()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error during initialization:", err);
  });
