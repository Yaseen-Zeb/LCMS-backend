const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "users",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: { type: DataTypes.STRING, allowNull: false },

    address: { type: DataTypes.TEXT, allowNull: true },
    specialization: {
      type: DataTypes.JSON,
    },
    experience: { type: DataTypes.INTEGER },
    profile_picture: { type: DataTypes.STRING, allowNull: false },
    certificate: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

User.associate = (models) => {
  User.hasMany(models.Case, {
    foreignKey: "client_id",
    onDelete: "CASCADE",
    as: "cases",
  });
  User.hasMany(models.Bidding, {
    foreignKey: "lawyer_id",
    onDelete: "CASCADE",
    as: "biddings",
  });
};

module.exports = User;
