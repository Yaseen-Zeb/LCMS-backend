const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
const userController = require("../controllers").user;

router.get("/list", userController.getLawyers);

router.get("/profile/:id", userController.lawyerProfile);

router.put("/profile/update", authenticate, userController.updateLawyerProfile);

module.exports = router;
