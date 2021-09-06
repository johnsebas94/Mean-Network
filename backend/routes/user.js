const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

//http://localhost:3003/api/user/registerUser
router.post("/registerUser", UserController.registerUser);
//http://localhost:3003/api/user/login
router.post("/login", UserController.login);
//http://localhost:3003/api/user/deleteUser
router.put("/deleteUser", Auth, ValidateUser, UserController.deleteUser);

module.exports = router;
