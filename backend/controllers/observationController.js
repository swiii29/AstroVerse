const Observation = require("../models/Observation");

// Get observations for logged-in user
const getObservations = async (req, res) => {
  try {
    const observations = await Observation.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: observations,
    });
  } catch (error) {
    console.error("Get observations error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch observations",
      error: error.message,
    });
  }
};

// Get public observations
const getPublicObservations = async (req, res) => {
  try {
    const observations = await Observation.find({
      isPublic: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: observations,
    });
  } catch (error) {
    console.error("Get public observations error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public observations",
      error: error.message,
    });
  }
};

// Get one observation
const getObservationById = async (req, res) => {
  try {
    const observation = await Observation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!observation) {
      return res.status(404).json({
        success: false,
        message: "Observation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: observation,
    });
  } catch (error) {
    console.error("Get observation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch observation",
      error: error.message,
    });
  }
};

// Create observation
const createObservation = async (req, res) => {
  try {
    const {
      objectName,
      objectType,
      observationDate,
      location,
      notes,
      visibility,
      isPublic,
    } = req.body;

    if (
      !objectName ||
      !objectType ||
      !observationDate ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Object name, object type, observation date and location are required",
      });
    }

    const observation = await Observation.create({
      userId: req.user.id,
      objectName,
      objectType,
      observationDate,
      location,
      notes,
      visibility,
      isPublic: isPublic !== false,
    });

    res.status(201).json({
      success: true,
      message: "Observation created successfully",
      data: observation,
    });
  } catch (error) {
    console.error("Create observation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create observation",
      error: error.message,
    });
  }
};

// Delete observation
const deleteObservation = async (req, res) => {
  try {
    const observation = await Observation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!observation) {
      return res.status(404).json({
        success: false,
        message: "Observation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Observation deleted successfully",
    });
  } catch (error) {
    console.error("Delete observation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete observation",
      error: error.message,
    });
  }
};

module.exports = {
  getObservations,
  getPublicObservations,
  getObservationById,
  createObservation,
  deleteObservation,
};