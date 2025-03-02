const {
  getHashValue,
  isHashMatch,
  signAccessToken,
} = require("../helpers/hash.helper");
const responseHelper = require("../helpers/response.helper");
const { User } = require("../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

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
    });

    return responseHelper.success(res, { token }, "Login successfully", 200);
  } catch (error) {
    return responseHelper.fail(res, error.message, 500);
  }
};

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      password,
      address,
      role,
      specialization,
      experience,
    } = req.body;

    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return responseHelper.fail(res, "Email already exists", 409);
    }

    const hashedPassword = await getHashValue(password);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone_number,
      password: hashedPassword,
      address,
      role,
      specialization: specialization || null,
      experience: experience || null,
    });

    const token = await signAccessToken({ id: newUser.id, name, email, role });

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
