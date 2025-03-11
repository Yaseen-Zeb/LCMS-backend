const responseHelper = require("../helpers/response.helper");
const { Bidding, Case } = require("../models");

const addBid = async (req, res) => {
  try {
    const { caseId, description } = req.body;
    const userId = req.user.id;

    // Fetch the case to get existing total_bids
    const caseData = await Case.findOne({
      where: { id: caseId },
    });

    if (!caseData) {
      return responseHelper.fail(res, "Case not found", 404);
    }

    // Ensure total_bids is an array (Handle potential null cases)
    let IsBidExist = await Bidding.findOne({where:{case_id:caseId,lawyer_id:userId}});

    // Check if the user has already bid
    if (IsBidExist) {
      return responseHelper.fail(
        res,
        "You have already submitted a bid for this case",
        409
      );
    }

    // Update the case with the new total_bids array
    await Case.update(
      { total_bids: caseData.total_bids + 1 },
      { where: { id: caseId } }
    );

    // Create a new bid record
    await Bidding.create({
      case_id: caseId,
      description,
      lawyer_id: userId,
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
          as: "case",
        },
        {
          model: User,
          foreignKey: "lawyer_id",
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
