const express = require("express");
const router = express.Router();
const { getAllAccessories, getById } = require("../controllers/accessories");

router.get("/all", getAllAccessories);
router.get("/:id", getById);

module.exports = router;
