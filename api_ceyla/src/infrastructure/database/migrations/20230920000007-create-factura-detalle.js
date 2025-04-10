'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('factura_detalle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      factura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'factura',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      negocio_equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'negocio_equipo',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valor: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('factura_detalle');
  }
}; 