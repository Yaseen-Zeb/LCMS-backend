const jwt = require("jsonwebtoken");
const response = require("../helpers/response.helper");
const { User } = require("../models");

module.exports.authenticate = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return response.fail(res, "Token is missing", 401);
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user) {
      return response.fail(res, "Account not found", 404);
    }

    req.user = user;
    next();
  } catch (err) {
    return response.fail(res, err.message, 401);
  }
};
