const responseHelper = require("../helpers/response.helper");
const { Bidding, Case } = require("../models");

const addBid = async (req, res) => {
  try {
    const { caseId, description } = req.body;

    const isBidExist = await Bidding.findOne({
      where: { case_id: caseId, lawyer_id: req.user.id },
    });

    if (isBidExist) {
      return responseHelper.fail(
        res,
        "You have already submitted bid for this case",
        409
      );
    }

    await Bidding.create({
      case_id: caseId,
      description,
      lawyer_id: req.user.id,
    });

    return responseHelper.success(res, [], "Bid submitted successfully", 200);
  } catch (error) {
    console.error("Error submitting bid:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const myBids = async (req, res) => {
  try {
    const { id } = req.user;
    const myBids = await Bidding.findAll({
      include: [
        {
          model: Case,
          foreignKey: "case_id",
          attributes: ["id", "title"],
          as: "case",
        },
      ],
      where: { lawyer_id: id },
      order: [["createdAt", "DESC"]],
    });

    return responseHelper.success(
      res,
      myBids,
      "Bids fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching Bids:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

module.exports = { addBid, myBids };
