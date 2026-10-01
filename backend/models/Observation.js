const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    objectName: {
      type: String,
      required: true,
      trim: true,
    },

    objectType: {
      type: String,
      enum: ["Planet", "Moon", "Star", "Exoplanet"],
      required: true,
    },

    observationDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    visibility: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
      default: "Good",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Observation", observationSchema);