const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "imf_gadget_db_xou2",
  process.env.DB_USER || "imf_gadget_db_xou2_user",
  process.env.DB_PASSWORD || "q0tcyTZ3GTYZpmTJKTNpTfgA3ezKCq1F",
  {
    host: process.env.DB_HOST || "dpg-cubm20qj1k6c73ed01hg-a",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
