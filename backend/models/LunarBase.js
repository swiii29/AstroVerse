const mongoose = require("mongoose");

const lunarBaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    mission: {
      type: String,
      required: true,
      trim: true,
    },

    missionDay: {
      type: Number,
      required: true,
      min: 0,
    },

    crew: {
      type: Number,
      required: true,
      min: 0,
    },

    baseHealth: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    currentPhase: {
      type: String,
      required: true,
      trim: true,
    },

    phaseProgress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    resources: {
      power: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      water: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      food: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      oxygen: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    status: {
      type: String,
      enum: ["Operational", "Warning", "Critical"],
      default: "Operational",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LunarBase", lunarBaseSchema);