const express = require("express");

const {
  getLunarBases,
  getLunarBaseById,
  createLunarBase,
  updateLunarBase,
  deleteLunarBase,
} = require("../controllers/lunarBaseController");

const router = express.Router();

// GET all lunar bases
router.get("/", getLunarBases);

// GET one lunar base
router.get("/:id", getLunarBaseById);

// CREATE lunar base
router.post("/", createLunarBase);

// UPDATE lunar base
router.put("/:id", updateLunarBase);

// DELETE lunar base
router.delete("/:id", deleteLunarBase);

module.exports = router;