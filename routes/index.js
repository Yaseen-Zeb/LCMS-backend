const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/case", authenticate, require("./case.route"));
router.use("/lawyer", authenticate, require("./lawyer.route"));

module.exports = router;
