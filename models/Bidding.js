// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Case = require("./Case");
// const User = require("./User");

// const Bidding = sequelize.define("Bidding", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   bid_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
//   bid_status: { type: DataTypes.ENUM("pending", "accepted", "rejected"), defaultValue: "pending" },
// });

// Bidding.belongsTo(models.User, { foreignKey: "lawyerId", as: "lawyer" });
// Bidding.belongsTo(models.Case, { foreignKey: "caseId", as: "case" });

// module.exports = Bidding;
