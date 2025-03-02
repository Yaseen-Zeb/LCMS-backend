const { ROLES } = require("../config/constant");
const responseHelper = require("../helpers/response.helper");
const { User, Case } = require("../models");

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

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const clientDetail = await User.findByPk(id);

    if (!clientDetail) {
      return responseHelper.fail(res, "Client not found", 404);
    }

    const [openCases, closedCases] = await Promise.all([
      Case.findAll({
        where: { client_id: id, status: "Open" },
      }),
      Case.findAll({
        where: { client_id: id, status: "Closed" },
      }),
    ]);
    const postedCases = openCases.length + closedCases.length;
    const clientData = clientDetail.toJSON();
    clientData.postedCases = postedCases;
    clientData.openCases = openCases;
    clientData.closedCases = closedCases;

    return responseHelper.success(
      res,
      clientData,
      "Client fetched successfully",
      200
    );
  } catch (error) {
    console.error("Error fetching client:", error);
    return responseHelper.fail(res, error.message, 500);
  }
};

const clientProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const client = await User.findByPk(id);

    if (!client) {
      return responseHelper.fail(res, "Client not found", 404);
    }

    const Cases = await Case.findAll({
      where: { client_id: id, status: "Open" },
    });

    const clientProfile = client.toJSON();
    clientProfile.cases = Cases;

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

module.exports = { getClientById, clientProfile, updateClientProfile };
