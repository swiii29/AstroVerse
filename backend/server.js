const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const celestialObjectRoutes = require("./routes/celestialObjectRoutes");
const observationRoutes = require("./routes/observationRoutes");
const lunarBaseRoutes = require("./routes/lunarBaseRoutes");
const missionRoutes = require("./routes/missionRoutes");

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// API Routes
// --------------------
app.use("/api/celestial-objects", celestialObjectRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/lunar-bases", lunarBaseRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/auth", authRoutes);
// --------------------
// Basic Routes
// --------------------
app.get("/", (req, res) => {
  res.json({
    message: "AstroVerse API is running 🚀",
    status: "online",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AstroVerse backend is healthy",
  });
});

// --------------------
// MongoDB Connection
// --------------------
const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI, {
  dbName: "AstroVerse",
  family: 4,
  tls: true,
});

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

// --------------------
// Start Server
// --------------------
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(`🚀 AstroVerse backend running on port ${PORT}`);
  });
};

startServer();