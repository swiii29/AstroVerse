const express = require("express");

const {
  getObservations,
  getPublicObservations,
  getObservationById,
  createObservation,
  deleteObservation,
} = require("../controllers/observationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public observations
router.get("/public", getPublicObservations);

// Personal observations
router.get("/", protect, getObservations);

router.get("/:id", protect, getObservationById);

router.post("/", protect, createObservation);

router.delete("/:id", protect, deleteObservation);

module.exports = router;