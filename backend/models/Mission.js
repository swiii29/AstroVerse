const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    agency: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["Planned", "Active", "Completed"],
      default: "Planned",
    },

    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },

    launchDate: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
    },

    objective: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);