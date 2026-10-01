const Mission = require("../models/Mission");

// GET all missions
const getMissions = async (req, res) => {
  try {
    const missions = await Mission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions,
    });
  } catch (error) {
    console.error("Error fetching missions:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch missions",
    });
  }
};

// GET one mission
const getMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mission,
    });
  } catch (error) {
    console.error("Error fetching mission:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch mission",
    });
  }
};

// CREATE mission
const createMission = async (req, res) => {
  try {
    const mission = await Mission.create(req.body);

    res.status(201).json({
      success: true,
      message: "Mission created successfully",
      data: mission,
    });
  } catch (error) {
    console.error("Error creating mission:", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to create mission",
      error: error.message,
    });
  }
};

// DELETE mission
const deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        message: "Mission not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mission deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting mission:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete mission",
    });
  }
};

module.exports = {
  getMissions,
  getMissionById,
  createMission,
  deleteMission,
};