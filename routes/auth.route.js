const express = require("express");
const router = express.Router();
const authController = require("../controllers/").auth;
const { schemaValidator } = require("../middlewares");
const { loginSchema, registerSchema } = require("../validationSchemas/auth");

// router.post("/register", UploadFile, authController.signup);
router.post(
  "/register",
  // UploadFile({fieldName:'logo'}),
  schemaValidator(registerSchema),
  authController.signup
);

router.post("/login", schemaValidator(loginSchema), authController.login);

module.exports = router;
