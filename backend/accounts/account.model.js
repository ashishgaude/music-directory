const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    fullname: { type: DataTypes.STRING(255), allowNull: false },
    isadmin: { type: DataTypes.TINYINT(1), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    isactive: { type: DataTypes.TINYINT(1), allowNull: false },
  };

  const options = {};

  return sequelize.define("user", attributes, options);
}
