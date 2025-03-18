const {
  getHashValue,
  isHashMatch,
  signAccessToken,
} = require("../helpers/hash.helper");
const responseHelper = require("../helpers/response.helper");
const { User } = require("../models");
const { registerSchema } = require("../validationSchemas/auth");

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let condition = { email: email.toLowerCase() };

    if (role) {
      condition.role = role;
    }

    const user = await User.findOne({ where: condition });

    if (!user) {
      return responseHelper.fail(res, "Invalid email or password", 401);
    }

    const isPasswordValid = await isHashMatch(password, user.password);

    if (!isPasswordValid) {
      return responseHelper.fail(res, "Invalid email or password", 401);
    }

    const token = await signAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profile_picture: user.profile_picture,
    });

    return responseHelper.success(res, { token }, "Login successfully", 200);
  } catch (error) {
    return responseHelper.fail(res, error.message, 500);
  }
};

const signup = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
      address: req.body.address,
      role: req.body.role,
      specialization: req.body.specialization
        ? JSON.parse(req.body.specialization)
        : [],
      experience: req.body.experience ? Number(req.body.experience) : undefined,
      profile_picture:
        req.files && req.files.profile_picture
          ? req.files.profile_picture[0].path
          : undefined,
      certificate:
        req.files && req.files.certificate
          ? req.files.certificate[0].path
          : undefined,
    };

    const { error } = registerSchema.validate(userData, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) =>
        detail.message.replace(/"/g, "")
      );
      return responseHelper.fail(res, errorMessages, 400);
    }

    const existingUser = await User.findOne({
      where: { email: userData.email.toLowerCase() },
    });

    if (existingUser) {
      return responseHelper.fail(res, "Email already exists", 409);
    }

    const hashedPassword = await getHashValue(userData.password);

    const newUser = await User.create({
      name: userData.name,
      email: userData.email.toLowerCase(),
      phone_number: userData.phone_number,
      password: hashedPassword,
      address: userData.address,
      role: userData.role,
      specialization: userData.specialization || null,
      experience: userData.experience || null,
      profile_picture: userData.profile_picture || null,
      certificate: userData.certificate || null,
      status: userData.role === "lawyer" ? false : true,
    });

    const token = await signAccessToken({
      id: newUser.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      profile_picture: userData.profile_picture,
    });

    return responseHelper.success(
      res,
      { token },
      "Registered successfully",
      201
    );
  } catch (error) {
    return responseHelper.fail(res, error.message, 500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return responseHelper.fail(res, "User not found", 404);
    }

    const isPasswordValid = await isHashMatch(oldPassword, user.password);
    if (!isPasswordValid) {
      return responseHelper.fail(res, "Old password is incorrect", 400);
    }

    const hashedNewPassword = await getHashValue(newPassword);

    await user.update({ password: hashedNewPassword });

    return responseHelper.success(
      res,
      {},
      "Password changed successfully",
      200
    );
  } catch (error) {
    return responseHelper.fail(res, error.message, 500);
  }
};

module.exports = {
  login,
  signup,
  changePassword,
};
