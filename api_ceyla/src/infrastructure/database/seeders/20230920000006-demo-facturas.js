'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los IDs de los negocios insertados
    const negocios = await queryInterface.sequelize.query(
      'SELECT id FROM negocio',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (negocios.length === 0) {
      console.log('⚠️ No se encontraron negocios. Ejecuta primero el seeder de negocios.');
      return;
    }

    // Crear array de facturas
    const facturas = [];
    
    // Facturas para el Negocio 1 - Proyecto Desarrollo Web (Juan Pérez)
    facturas.push({
      negocio_id: negocios[0].id,
      fecha_factura: new Date('2023-02-01'),
      valor_factura: 476000 // Suma de los valores totales de los equipos asignados
    });
    
    facturas.push({
      negocio_id: negocios[0].id,
      fecha_factura: new Date('2023-03-01'),
      valor_factura: 476000
    });
    
    // Facturas para el Negocio 2 - Mantenimiento Servidores (Juan Pérez)
    facturas.push({
      negocio_id: negocios[1].id,
      fecha_factura: new Date('2023-03-01'),
      valor_factura: 952000 // 800000 + IVA
    });
    
    facturas.push({
      negocio_id: negocios[1].id,
      fecha_factura: new Date('2023-04-01'),
      valor_factura: 952000
    });
    
    facturas.push({
      negocio_id: negocios[1].id,
      fecha_factura: new Date('2023-05-01'),
      valor_factura: 952000
    });
    
    // Facturas para el Negocio 3 - Diseño Identidad Corporativa (María González)
    facturas.push({
      negocio_id: negocios[2].id,
      fecha_factura: new Date('2023-04-01'),
      valor_factura: 535500 // 300000 + 150000 + IVA
    });
    
    facturas.push({
      negocio_id: negocios[2].id,
      fecha_factura: new Date('2023-05-01'),
      valor_factura: 535500
    });
    
    // Facturas para el Negocio 4 - Implementación CRM (Carlos Rodríguez)
    facturas.push({
      negocio_id: negocios[3].id,
      fecha_factura: new Date('2023-06-01'),
      valor_factura: 440300 // 220000 + 150000 + IVA
    });

    return queryInterface.bulkInsert('factura', facturas);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('factura', null, {});
  }
}; 