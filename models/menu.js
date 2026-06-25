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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
          min: {
            args: 1000,
            msg: "Minimun price is Rp.1000",
          },
        },
      },
      CategoryId: DataTypes.INTEGER,
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Stock name is required",
          },
          notEmpty: {
            msg: "Stock is required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is required",
          },
          notEmpty: {
            msg: "Image is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    },
  );
  return Menu;
};
