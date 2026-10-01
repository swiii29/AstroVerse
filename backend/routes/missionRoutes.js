const express = require("express");

const {
  getMissions,
  getMissionById,
  createMission,
  deleteMission,
} = require("../controllers/missionController");

const router = express.Router();

// GET all missions
router.get("/", getMissions);

// GET one mission
router.get("/:id", getMissionById);

// CREATE mission
router.post("/", createMission);

// DELETE mission
router.delete("/:id", deleteMission);

module.exports = router;