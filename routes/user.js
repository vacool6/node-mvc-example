const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  changeAdminById,
  changeAdminForAll,
  deleteUserById,
} = require("../controllers/user");

const { validateEmail, hasAccess } = require("../utils/middleware");

router.get("/allusers", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/adduser", validateEmail, addUser);
router.patch("/user/:id", updateUserById);
router.patch("/toggleadmin/:id", changeAdminById);
router.patch("/changeadmin", changeAdminForAll);
router.delete("/user/:id", hasAccess, deleteUserById);

module.exports = router;
