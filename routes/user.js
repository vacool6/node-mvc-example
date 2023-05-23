const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  changeAdminForId,
  changeAdminForAll,
  deleteUserById,
} = require("../controllers/user");

const { validateEmail, hasAccess } = require("../utils/middlewares");

router.get("/allusers", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/adduser", hasAccess, validateEmail, addUser);
router.patch("/user/:id", updateUserById);
router.patch("/toggleadmin/:id", changeAdminForId);
router.patch("/changeadmin", changeAdminForAll);
router.delete("/user/:id", hasAccess, deleteUserById);

module.exports = router;
