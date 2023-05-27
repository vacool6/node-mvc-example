const express = require("express");
const router = express.Router();
const {
  addVehicle,
  getAllVehicles,
  deleteVehicleById,
  updateVehicleById,
} = require("../controllers/vehicle");

router.get("/allvehicles/:userId", getAllVehicles);
router.post("/addvehicle/:userId", addVehicle);
router.patch("/update/:vehicleId", updateVehicleById);
// 1
// router.delete("/remove/:userId/:vehicleId", deleteVehicleById);
// 2
router.delete("/remove/:vehicleId", deleteVehicleById);

module.exports = router;
