'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener las facturas
    const facturas = await queryInterface.sequelize.query(
      'SELECT id, negocio_id FROM factura',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Obtener las relaciones negocio-equipo
    const negocioEquipos = await queryInterface.sequelize.query(
      'SELECT id, negocio_id, valor_total FROM negocio_equipo',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (facturas.length === 0 || negocioEquipos.length === 0) {
      console.log('⚠️ No se encontraron facturas o relaciones negocio-equipo. Ejecuta primero esos seeders.');
      return;
    }

    // Crear array de detalles de factura
    const facturaDetalles = [];
    
    // Para cada factura, buscar todas las relaciones negocio-equipo asociadas al negocio
    // y crear un detalle de factura por cada una
    for (const factura of facturas) {
      const relacionesDelNegocio = negocioEquipos.filter(
        ne => ne.negocio_id === factura.negocio_id
      );
      
      for (const relacion of relacionesDelNegocio) {
        facturaDetalles.push({
          factura_id: factura.id,
          negocio_equipo_id: relacion.id,
          valor: relacion.valor_total
        });
      }
    }

    return queryInterface.bulkInsert('factura_detalle', facturaDetalles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('factura_detalle', null, {});
  }
}; 