const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const celestialRoutes = require("./routes/celestialRoutes");
const observationRoutes = require("./routes/observationRoutes");
const missionRoutes = require("./routes/missionRoutes");
const lunarBaseRoutes = require("./routes/lunarBaseRoutes");

dotenv.config();

const app = express();

// ================================
// DATABASE
// ================================

connectDB();

// ================================
// MIDDLEWARE
// ================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow Base64 observation photos
app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: true, limit: "8mb" }));

// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AstroVerse backend is healthy",
  });
});

// ================================
// API ROUTES
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/celestial-objects", celestialRoutes);

app.use("/api/observations", observationRoutes);

app.use("/api/missions", missionRoutes);

app.use("/api/lunar-bases", lunarBaseRoutes);

// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ================================
// ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`AstroVerse backend running on port ${PORT}`);
});