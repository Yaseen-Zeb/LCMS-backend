// const { User, OtherDetail, Team, Payment } = require("../models");
// const responseHelper = require("../helpers/response.helper");
// const {
//   RESPONSE_MESSAGES
// } = require("../config/constant");

// const contactInfo = process.env.CONTACT_INFO;

// // Create Company
// const createCompany = async (req, res) => {
//   try {
//     const newCompany = await Company.create(req.body);
//     return responseHelper.success(
//       res,
//       newCompany,
//       RESPONSE_MESSAGES.CREATED_SUCCESSFULLY,
//       201
//     );
//   } catch (err) {
//     return responseHelper.fail(res, err.message, 500);
//   }
// };

// // Update User
// // const updateUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const user = await User.findByPk(id);
// //     const { user_type, name, email } = req.body;

// //     if (!user) {
// //       return responseHelper.fail(res, RESPONSE_MESSAGES.USER_NOT_FOUND, 404);
// //     }

// //     if (user_type === USER_TYPES.RUNNER) {
// //       const isExisting = await Team.findOne({
// //         include: [
// //           {
// //             model: User,
// //             as: "runners",
// //             where: {
// //               [Op.or]: [
// //                 { name: req.body.name, id: { [Op.ne]: id } },
// //                 {
// //                   [Op.and]: [
// //                     { email: req.body?.email },
// //                     { email: { [Op.ne]: null } },
// //                     { email: { [Op.ne]: "" } },
// //                     { id: { [Op.ne]: id } },
// //                   ],
// //                 },
// //               ],
// //             },
// //           },
// //         ],
// //         where: { company_id: req.user.id },
// //       });

// //       if (isExisting) {
// //         const isNameConflict = isExisting.runners.some(
// //           (runner) => runner.name.toLowerCase() === name.toLowerCase()
// //         );
// //         const conflictMessage = isNameConflict
// //           ? RESPONSE_MESSAGES.NAME_ALREADY_EXIST
// //           : RESPONSE_MESSAGES.EMAIL_ALREADY_EXIST;

// //         return responseHelper.fail(res, conflictMessage, 409);
// //       }
// //     }

// //     if (user_type === USER_TYPES.VISITOR) {
// //       const isExisting = await User.findOne({
// //         include: [
// //           {
// //             model: User,
// //             as: "company",
// //             where: { id: req.user.id },
// //           },
// //         ],
// //         where: {
// //           [Op.or]: [
// //             { name, id: { [Op.ne]: id } },
// //             {
// //               [Op.and]: [
// //                 { email },
// //                 { email: { [Op.ne]: null } },
// //                 { email: { [Op.ne]: "" } },
// //                 { id: { [Op.ne]: id } },
// //               ],
// //             },
// //           ],
// //         },
// //       });

// //       if (isExisting) {
// //         const conflictMessage =
// //           isExisting.name.toLowerCase() === name.toLowerCase()
// //             ? RESPONSE_MESSAGES.NAME_ALREADY_EXIST
// //             : RESPONSE_MESSAGES.EMAIL_ALREADY_EXIST;

// //         return responseHelper.fail(res, conflictMessage, 409);
// //       }
// //     }

// //     if (user_type === USER_TYPES.STUDENT) {
// //       const isExisting = await User.findOne({
// //         include: [
// //           {
// //             model: User,
// //             as: "university_student",
// //             where: { id: req.user.id },
// //           },
// //         ],
// //         where: {
// //           [Op.or]: [
// //             { name, id: { [Op.ne]: id } },
// //             {
// //               [Op.and]: [
// //                 { email },
// //                 { email: { [Op.ne]: null } },
// //                 { email: { [Op.ne]: "" } },
// //                 { id: { [Op.ne]: id } },
// //               ],
// //             },
// //           ],
// //         },
// //       });

// //       if (isExisting) {
// //         const conflictMessage =
// //           isExisting.name.toLowerCase() === name.toLowerCase()
// //             ? RESPONSE_MESSAGES.NAME_ALREADY_EXIST
// //             : RESPONSE_MESSAGES.EMAIL_ALREADY_EXIST;

// //         return responseHelper.fail(res, conflictMessage, 409);
// //       }
// //     }

// //     if (user_type === USER_TYPES.FOCAL_PERSON) {
// //       const isExisting = await User.findOne({
// //         include: [
// //           {
// //             model: User,
// //             as: "university_focal_person",
// //           },
// //         ],
// //         where: {
// //           [Op.or]: [
// //             { name, id: { [Op.ne]: id } },
// //             {
// //               [Op.and]: [
// //                 { email },
// //                 { email: { [Op.ne]: null } },
// //                 { email: { [Op.ne]: "" } },
// //                 { id: { [Op.ne]: id } },
// //               ],
// //             },
// //           ],
// //           university_focal_person_id: req.body.university_id,
// //         },
// //       });

// //       if (isExisting) {
// //         const conflictMessage =
// //           isExisting.name.toLowerCase() === name.toLowerCase()
// //             ? RESPONSE_MESSAGES.NAME_ALREADY_EXIST
// //             : RESPONSE_MESSAGES.EMAIL_ALREADY_EXIST;

// //         return responseHelper.fail(res, conflictMessage, 409);
// //       }

// //       if (user.email !== email) {
// //         const randomPassword = Array(5)
// //           .fill(0)
// //           .map(
// //             () =>
// //               "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"[
// //                 Math.floor(Math.random() * 70)
// //               ]
// //           )
// //           .join("");
// //         user.password = await getHashValue(randomPassword);
// //         user.save();

// //         const baseURL = req.get("origin");
// //         const applicationLink = baseURL + "/login"; // Application login link
// //         const logoURL = baseURL + ASSETS.K2X_LOGO;

// //         let message = {
// //           messageSubject: `Focal Person Account Created Successfully`,
// //           messageBody: emailContent(
// //             logoURL,
// //             ` <div class="content">
// //                   <h3>Dear ${user.name},</h3>
// //                   <p>We are pleased to inform you that your account has been successfully created by the admin. You can now log in to your account using the credentials provided below:</p>
// //                   <span><strong>Email:</strong> ${user.email}</span><br>
// //                   <span><strong>Password:</strong> ${randomPassword}</span><br>
// //                   <span><strong>Application Link:</strong> <a href="${applicationLink}">${applicationLink}</a></span><br>
// //                   <p>We recommend changing your password after logging in for the first time to ensure the security of your account.</p>
// //                                  ${
// //                                    contactInfo
// //                                      ? `<p>For any queries or concerns, please feel free to contact us at ${contactInfo}</p>`
// //                                      : ""
// //                                  }
// //                   <p class="ys">Yours sincerely,</p>
// //                   <p class="ys">KTR Support Team</p>
// //                   <br>
// //               </div>`
// //           ),
// //         };

// //         await sendMail(user.email, message);
// //       }
// //     }

// //     if (user_type === USER_TYPES.UNIVERSITY) {
// //       const isExisting = await User.findOne({
// //         where: {
// //           name,
// //           id: { [Op.ne]: id },
// //           user_type: USER_TYPES.UNIVERSITY,
// //         },
// //       });

// //       if (isExisting) {
// //         const conflictMessage = RESPONSE_MESSAGES.NAME_ALREADY_EXIST;
// //         return responseHelper.fail(res, conflictMessage, 409);
// //       }
// //     }

// //     await user.update(req.body, { where: { id } });

// //     if (USER_TYPES.UNIVERSITY) {
// //       await OtherDetail.update(req.body, { where: { user_id: id } });
// //     }

// //     return responseHelper.success(
// //       res,
// //       user,
// //       RESPONSE_MESSAGES.UPDATED_SUCCESSFULLY,
// //       200
// //     );
// //   } catch (err) {
// //     return responseHelper.fail(res, err.message, 500);
// //   }
// // };


// // Delete User
// // const deleteUser = async (req, res) => {
// //   try {
// //     const user = await User.findByPk(req.params.id);
// //     if (!user) {
// //       return responseHelper.fail(res, RESPONSE_MESSAGES.USER_NOT_FOUND, 404);
// //     }

// //     await user.destroy();
// //     return responseHelper.success(
// //       res,
// //       null,
// //       RESPONSE_MESSAGES.DELETED_SUCCESSFULLY,
// //       200
// //     );
// //   } catch (err) {
// //     return responseHelper.fail(res, err.message, 500);
// //   }
// // };

// module.exports = {
//   createCompany,
// };
