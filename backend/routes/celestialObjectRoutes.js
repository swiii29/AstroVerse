const express = require("express");

const {
  getCelestialObjects,
  getCelestialObjectById,
  createCelestialObject,
  deleteCelestialObject,
} = require("../controllers/celestialObjectController");

const router = express.Router();

// GET all celestial objects
router.get("/", getCelestialObjects);

// GET one celestial object
router.get("/:id", getCelestialObjectById);

// CREATE a celestial object
router.post("/", createCelestialObject);

// DELETE a celestial object
router.delete("/:id", deleteCelestialObject);

module.exports = router;