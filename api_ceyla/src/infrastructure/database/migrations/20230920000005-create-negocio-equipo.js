'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('negocio_equipo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      negocio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'negocio',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      valor_arrendamiento: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      tarifa_iva: {
        type: Sequelize.INTEGER(2),
        allowNull: false,
        defaultValue: 19
      },
      valor_total: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('negocio_equipo');
  }
}; 