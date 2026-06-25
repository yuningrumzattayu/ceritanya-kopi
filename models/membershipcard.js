"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MembershipCard extends Model {
    static async updatePoints(UserId, subtotal) {
      const membership = await MembershipCard.findOne({
        where: {
          UserId,
        },
      });

      const earnedPoints = Math.floor(subtotal / 1000);

      const newPoints = membership.points + earnedPoints;

      let level = "Bronze";

      if (newPoints >= 300) {
        level = "Gold";
      } else if (newPoints >= 100) {
        level = "Silver";
      }

      await membership.update({
        points: newPoints,
        level,
      });
    }
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
