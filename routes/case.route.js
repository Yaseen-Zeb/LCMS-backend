const express = require("express");
const router = express.Router();
const caseController = require("../controllers").case;
const { schemaValidator } = require("../middlewares");
const {caseSchema} = require("../validationSchemas/case");

router.post(
  "/create",
  schemaValidator(caseSchema),
  caseController.addCase
);

router.get(
  "/list",
  caseController.getCases
);


router.get(
  "/my-cases",
  caseController.getMyCases
);


module.exports = router;
