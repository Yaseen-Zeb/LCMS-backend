const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.route"));
router.use("/case", require("./case.route"));
router.use("/lawyer", require("./lawyer.route"));

module.exports = router;
