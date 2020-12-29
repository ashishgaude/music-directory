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
    newsongname: { type: DataTypes.STRING(100) },
    searchsongname: { type: DataTypes.STRING(100) },
    searchartistname: { type: DataTypes.STRING(100) },
    lyric: { type: DataTypes.TEXT },
    searchmid: { type: DataTypes.STRING(36) },
    refer1: { type: DataTypes.INTEGER(11) },
    referremark1: { type: DataTypes.STRING(20) },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  };

  const options = {};

  return sequelize.define("songmasterlist", attributes, options);
}
