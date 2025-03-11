const { Op } = require("sequelize");
const { ROLES } = require("../config/constant");
const responseHelper = require("../helpers/response.helper");
const { User, Bidding, Case } = require("../models");

const getLawyers = async (req, res) => {
  try {
    const lawyers = await User.findAll({
      where: { role: ROLES.LAWYER },
      order: [["createdAt", "DESC"]],
    });

    return responseHelper.success(
      res,
      lawyers,
      "Lawyer fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const lawyerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const lawyerProfile = await Bidding.findAll({
      include: [
        {
          model: User,
          foreignKey: "lawyer_id",
          as: "lawyer",
        },
        {
          model: Case,
          foreignKey: "case_id",
          as: "case",
        },
      ],
      where: { lawyer_id: id },
    });

    if (!lawyerProfile) {
      return responseHelper.fail(res, "Lawyer not found", 404);
    }

    return responseHelper.success(
      res,
      lawyerProfile,
      "Lawyer fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const updateLawyerProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const lawyerProfile = await User.update({ ...req.body }, { where: { id } });

    return responseHelper.success(
      res,
      lawyerProfile,
      "Lawyer profile updated successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

// Client functions

// const getClients = async (req, res) => {
//   try {
//     const clients = await User.findAll({
//       where: { role: ROLES.LAWYER },
//       order: [["createdAt", "DESC"]],
//     });

//     return responseHelper.success(
//       res,
//       clients,
//       "Lawyer fetched successfully",
//       200
//     );
//   } catch (error) {
//     console.error("Error fetching clients:", error);
//     return responseHelper.fail(res, error.message, 500);
//   }
// };

const clientProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await User.findOne({ where: { id, role: ROLES.CLIENT } });

    if (!client) {
      return responseHelper.fail(res, "Client not found", 404);
    }

    const Cases = await Case.findAll({
      where: { client_id: id },
    });

    const caseIds = Cases.map((caseItem) => caseItem.id);

    // Fetch bids related to those cases
    const Bids = await Bidding.findAll({
      include: [
        {
          model: Case,
          foreignKey: "case_id",
          as: "case",
        },
        {
          model: User,
          foreignKey: "lawyer_id",
          as: "lawyer",
        },
      ],
      where: {
        case_id: {
          [Op.in]: caseIds,
        },
      },
      order: [
        ["createdAt", "DESC"],
        ["case", "title", "ASC"],
      ],
    });

    const clientProfile = client.toJSON();
    clientProfile.cases = Cases;
    clientProfile.bids = Bids;

    return responseHelper.success(
      res,
      clientProfile,
      "Client fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const updateClientProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const lawyerProfile = await User.update({ ...req.body }, { where: { id } });

    return responseHelper.success(
      res,
      lawyerProfile,
      "Lawyer profile updated successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

module.exports = {
  getLawyers,
  lawyerProfile,
  updateLawyerProfile,
  clientProfile,
  updateClientProfile,
};
