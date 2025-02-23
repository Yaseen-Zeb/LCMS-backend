const responseHelper = require("../helpers/response.helper");
const { Case } = require("../models");

const addCase = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    const existingCase = await Case.findOne({
      where: { title: body.title, client_id: user.id },
    });

    if (existingCase) {
      return responseHelper.fail(
        res,
        "A case with this title already exists.",
        409
      );
    }

    const newCase = await Case.create(body);

    return responseHelper.success(
      res,
      { newCase },
      "Case added successfully",
      201
    );
  } catch (error) {
    console.error("Error adding case:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const getCases = async (req, res) => {
  try {
    const cases = await Case.findAll({ order: [["createdAt", "DESC"]] });

    return responseHelper.success(
      res,
      { cases },
      "Case fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching cases:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const getMyCases = async (req, res) => {
  try {
    const cases = await Case.findAll({
      where: { client_id: req.user.id },
      order: ["createdAt", "DESC"],
    });

    return responseHelper.success(
      res,
      { cases },
      "Case fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching cases:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

module.exports = { addCase, getCases,getMyCases };
