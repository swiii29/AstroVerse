const LunarBase = require("../models/LunarBase");

// GET all lunar bases
const getLunarBases = async (req, res) => {
  try {
    const bases = await LunarBase.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bases.length,
      data: bases,
    });
  } catch (error) {
    console.error("Error fetching lunar bases:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lunar bases",
    });
  }
};

// GET one lunar base
const getLunarBaseById = async (req, res) => {
  try {
    const base = await LunarBase.findById(req.params.id);

    if (!base) {
      return res.status(404).json({
        success: false,
        message: "Lunar base not found",
      });
    }

    res.status(200).json({
      success: true,
      data: base,
    });
  } catch (error) {
    console.error("Error fetching lunar base:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lunar base",
    });
  }
};

// CREATE lunar base
const createLunarBase = async (req, res) => {
  try {
    const base = await LunarBase.create(req.body);

    res.status(201).json({
      success: true,
      message: "Lunar base created successfully",
      data: base,
    });
  } catch (error) {
    console.error("Error creating lunar base:", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to create lunar base",
      error: error.message,
    });
  }
};

// UPDATE lunar base
const updateLunarBase = async (req, res) => {
  try {
    const base = await LunarBase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!base) {
      return res.status(404).json({
        success: false,
        message: "Lunar base not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lunar base updated successfully",
      data: base,
    });
  } catch (error) {
    console.error("Error updating lunar base:", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to update lunar base",
      error: error.message,
    });
  }
};

// DELETE lunar base
const deleteLunarBase = async (req, res) => {
  try {
    const base = await LunarBase.findByIdAndDelete(req.params.id);

    if (!base) {
      return res.status(404).json({
        success: false,
        message: "Lunar base not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lunar base deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lunar base:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete lunar base",
    });
  }
};

module.exports = {
  getLunarBases,
  getLunarBaseById,
  createLunarBase,
  updateLunarBase,
  deleteLunarBase,
};