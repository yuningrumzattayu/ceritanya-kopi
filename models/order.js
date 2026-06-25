"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
      });

      Order.hasMany(models.OrderDetail, {
        foreignKey: "OrderId",
      });

      Order.belongsToMany(models.Menu, {
        through: models.OrderDetail,
        foreignKey: "OrderId",
      });
    }
  }
  Order.init(
    {
      date: DataTypes.DATE,
      status: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
