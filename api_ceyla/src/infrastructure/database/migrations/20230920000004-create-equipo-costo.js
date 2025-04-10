'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipo_costo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipo',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      valor: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipo_costo');
  }
}; 