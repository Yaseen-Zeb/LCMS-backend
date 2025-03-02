const express = require("express");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
const clientController = require("../controllers").client;

router.get("/profile/:id", clientController.getClientById);

router.get("/profile", authenticate, clientController.clientProfile);

router.put("/profile/update", authenticate, clientController.updateClientProfile);

module.exports = router;