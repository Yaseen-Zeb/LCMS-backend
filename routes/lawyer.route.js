const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers").lawyer;


router.get(
  "/list",
  lawyerController.getLawyers
);

module.exports = router;
