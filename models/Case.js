const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { URGENCY_LEVELS, BUDGET_TYPES } = require("../config/constant");

const Case = sequelize.define("cases", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  expertise_required: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  case_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urgency: {
    type: DataTypes.STRING,
    defaultValue: "Standard",
  },
  budget_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Open",
  },
  budget_amount: { type: DataTypes.FLOAT, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: false },
  total_bids: { type: DataTypes.INTEGER, allowNull: true },
  client_id: { type: DataTypes.INTEGER, allowNull: false },
  assignedLawyer_id: { type: DataTypes.INTEGER, allowNull: true },
});

Case.associate = (models) => {
  Case.belongsTo(models.User, { foreignKey: "client_id", as: "client" });
  Case.belongsTo(models.User, {
    foreignKey: "assignedLawyer_id",
    as: "assignedLawyer",
  });
  Case.hasMany(models.Bidding, {
    foreignKey: "case_id",
    as: "biddings",
  });
};

module.exports = Case;
