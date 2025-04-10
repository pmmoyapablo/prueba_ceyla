'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    return queryInterface.bulkInsert('cliente', [
      {
        numero_documento: 123456789,
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '3001234567'
      },
      {
        numero_documento: 987654321,
        nombre: 'María',
        apellido: 'González',
        email: 'maria.gonzalez@example.com',
        telefono: '3109876543'
      },
      {
        numero_documento: 555666777,
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        email: 'carlos.rodriguez@example.com',
        telefono: '3205557777'
      },
      {
        numero_documento: 111222333,
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'ana.martinez@example.com',
        telefono: '3151112222'
      },
      {
        numero_documento: 444555666,
        nombre: 'Pedro',
        apellido: 'López',
        email: 'pedro.lopez@example.com',
        telefono: '3004445555'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return queryInterface.bulkDelete('cliente', null, {});
  }
}; 