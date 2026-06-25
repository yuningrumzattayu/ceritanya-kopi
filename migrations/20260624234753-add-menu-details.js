"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Menus", "stock", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("Menus", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Menus", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Menus", "description");
    await queryInterface.removeColumn("Menus", "imageUrl");
    await queryInterface.removeColumn("Menus", "stock");
  },
};
