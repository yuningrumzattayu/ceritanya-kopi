"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });

      Menu.hasMany(models.OrderDetail, {
        foreignKey: "MenuId",
      });

      Menu.belongsToMany(models.Order, {
        through: models.OrderDetail,
        foreignKey: "MenuId",
      });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Menu",
    },
  );
  return Menu;
};
