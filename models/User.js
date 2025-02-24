const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { ROLES } = require("../config/constant");

const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(...Object.values(ROLES)), allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: true },
    specialization: {
      type: DataTypes.JSON,
    },
    experience: { type: DataTypes.INTEGER },
  },
  { timestamps: true }
);

User.associate = (models) => {
  User.hasMany(models.Case, {
    foreignKey: "client_id",
    onDelete: "CASCADE",
    as: "cases",
  });
};

module.exports = User;
