const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/case", require("./case.route"));
router.use("/user", require("./user.route"));
router.use("/bid", authenticate , require("./bidding.route"));
router.use("/feedback" , require("./feedback.route"));

module.exports = router;