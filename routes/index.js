const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/case", require("./case.route"));
router.use("/lawyer", require("./lawyer.route"));
router.use("/client", require("./client.route"));
router.use("/bid", authenticate , require("./bidding.route"));

module.exports = router;
