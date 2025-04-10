'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      referencia: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      valor_compra: {
        type: Sequelize.BIGINT(20),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipo');
  }
}; 