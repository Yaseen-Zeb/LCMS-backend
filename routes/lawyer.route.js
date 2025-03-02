const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
const lawyerController = require("../controllers").lawyer;


router.get(
  "/list",
  lawyerController.getLawyers
);

router.get(
  "/profile/:id",
  lawyerController.getLawyerById
);

router.get("/profile", authenticate, lawyerController.lawyerProfile);

router.put("/profile/update", authenticate, lawyerController.updateLawyerProfile);


module.exports = router;
