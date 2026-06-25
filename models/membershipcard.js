"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MembershipCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MembershipCard.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  MembershipCard.init(
    {
      cardNumber: DataTypes.STRING,
      level: DataTypes.STRING,
      points: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MembershipCard",
    },
  );
  return MembershipCard;
};
