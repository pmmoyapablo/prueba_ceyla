'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('equipo', [
      {
        serial: 'SN-001-2023',
        referencia: 'Laptop Dell XPS 13',
        valor_compra: 4500000
      },
      {
        serial: 'SN-002-2023',
        referencia: 'Laptop HP Spectre x360',
        valor_compra: 3800000
      },
      {
        serial: 'SN-003-2023',
        referencia: 'MacBook Pro M1',
        valor_compra: 5200000
      },
      {
        serial: 'SN-004-2023',
        referencia: 'Servidor Dell PowerEdge',
        valor_compra: 12000000
      },
      {
        serial: 'SN-005-2023',
        referencia: 'Laptop Lenovo ThinkPad X1',
        valor_compra: 4200000
      },
      {
        serial: 'SN-006-2023',
        referencia: 'iPad Pro 12.9"',
        valor_compra: 3500000
      },
      {
        serial: 'SN-007-2023',
        referencia: 'Impresora HP LaserJet',
        valor_compra: 1800000
      },
      {
        serial: 'SN-008-2023',
        referencia: 'PC de Escritorio HP',
        valor_compra: 3200000
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('equipo', null, {});
  }
}; 