'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero, obtener los IDs de los clientes insertados
    const clientes = await queryInterface.sequelize.query(
      'SELECT id FROM cliente',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (clientes.length === 0) {
      console.log('⚠️ No se encontraron clientes. Ejecuta primero el seeder de clientes.');
      return;
    }

    // Crear array de negocios
    const negocios = [];
    
    // Cliente 1 - Juan Pérez
    negocios.push({
      cliente_id: clientes[0].id,
      nombre: 'Proyecto de Desarrollo Web',
      fecha_inicio: new Date('2023-01-15'),
      fecha_fin: new Date('2023-12-31')
    });
    
    negocios.push({
      cliente_id: clientes[0].id,
      nombre: 'Mantenimiento de Servidores',
      fecha_inicio: new Date('2023-02-01'),
      fecha_fin: null // Negocio sin fecha de fin (activo)
    });
    
    // Cliente 2 - María González
    negocios.push({
      cliente_id: clientes[1].id,
      nombre: 'Diseño de Identidad Corporativa',
      fecha_inicio: new Date('2023-03-10'),
      fecha_fin: new Date('2023-06-30')
    });
    
    // Cliente 3 - Carlos Rodríguez
    negocios.push({
      cliente_id: clientes[2].id,
      nombre: 'Implementación de CRM',
      fecha_inicio: new Date('2023-05-01'),
      fecha_fin: null // Negocio sin fecha de fin (activo)
    });
    
    // Cliente 4 - Ana Martínez
    negocios.push({
      cliente_id: clientes[3].id,
      nombre: 'Desarrollo de Aplicación Móvil',
      fecha_inicio: new Date('2023-04-15'),
      fecha_fin: new Date('2023-10-15')
    });
    
    // Cliente 5 - Pedro López
    negocios.push({
      cliente_id: clientes[4].id,
      nombre: 'Consultoría de Seguridad Informática',
      fecha_inicio: new Date('2023-06-01'),
      fecha_fin: null // Negocio sin fecha de fin (activo)
    });

    return queryInterface.bulkInsert('negocio', negocios);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('negocio', null, {});
  }
}; 