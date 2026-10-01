const mongoose = require("mongoose");

const celestialObjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Planet", "Moon", "Star", "Exoplanet"],
    },

    description: {
      type: String,
      required: true,
    },

    distance: {
      type: String,
      default: "Unknown",
    },

    image: {
      type: String,
      default: "",
    },

    facts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CelestialObject",
  celestialObjectSchema
);