const { ROLES } = require("../config/constant");
const responseHelper = require("../helpers/response.helper");
const { User } = require("../models");

const getLawyers = async (req, res) => {
  try {
    const lawyers = await User.findAll({
      where: { role: ROLES.LAWYER },
      order: [["createdAt", "DESC"]],
    });

    return responseHelper.success(
      res,
      { lawyers },
      "Lawyer fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

module.exports = { getLawyers };
