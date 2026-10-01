const CelestialObject = require("../models/CelestialObject");

// GET all celestial objects
const getCelestialObjects = async (req, res) => {
  try {
    const objects = await CelestialObject.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: objects.length,
      data: objects,
    });
  } catch (error) {
    console.error("Error fetching celestial objects:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch celestial objects",
    });
  }
};

// GET one celestial object by ID
const getCelestialObjectById = async (req, res) => {
  try {
    const object = await CelestialObject.findById(req.params.id);

    if (!object) {
      return res.status(404).json({
        success: false,
        message: "Celestial object not found",
      });
    }

    res.status(200).json({
      success: true,
      data: object,
    });
  } catch (error) {
    console.error("Error fetching celestial object:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch celestial object",
    });
  }
};

// CREATE a celestial object
const createCelestialObject = async (req, res) => {
  try {
    const object = await CelestialObject.create(req.body);

    res.status(201).json({
      success: true,
      message: "Celestial object created successfully",
      data: object,
    });
  } catch (error) {
    console.error("Error creating celestial object:", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to create celestial object",
      error: error.message,
    });
  }
};

// DELETE a celestial object
const deleteCelestialObject = async (req, res) => {
  try {
    const object = await CelestialObject.findByIdAndDelete(req.params.id);

    if (!object) {
      return res.status(404).json({
        success: false,
        message: "Celestial object not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Celestial object deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting celestial object:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete celestial object",
    });
  }
};

module.exports = {
  getCelestialObjects,
  getCelestialObjectById,
  createCelestialObject,
  deleteCelestialObject,
};