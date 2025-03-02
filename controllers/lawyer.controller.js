const { where } = require("sequelize");
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

const getLawyerById = async (req, res) => {
  try {
    const { id } = req.params;

    const lawyerDetail = await User.findByPk(id);

    return responseHelper.success(
      res,
      lawyerDetail,
      "Lawyer fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching lawyer:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const lawyerProfile = async (req, res) => {
  try {
    const { id } = req.user;

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

module.exports = {
  getLawyerById,
  getLawyers,
  lawyerProfile,
  updateLawyerProfile,
};
