const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
const userController = require("../controllers").user;

router.get("/profile/:id", userController.clientProfile);

router.put("/profile/update", authenticate, userController.updateClientProfile);

module.exports = router;