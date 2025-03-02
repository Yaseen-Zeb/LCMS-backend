const express = require("express");
const router = express.Router();
const biddingController = require("../controllers").bidding;

router.post("/create", biddingController.addBid);

router.get("/my-bids", biddingController.myBids);

module.exports = router;
