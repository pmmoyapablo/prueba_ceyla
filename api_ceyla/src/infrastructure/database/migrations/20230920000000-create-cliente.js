'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cliente', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_documento: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true
      },
      nombre: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING(10),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cliente');
  }
}; 