'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener los IDs de los negocios insertados
    const negocios = await queryInterface.sequelize.query(
      'SELECT id FROM negocio',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Obtener los IDs de los equipos insertados
    const equipos = await queryInterface.sequelize.query(
      'SELECT id FROM equipo',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (negocios.length === 0 || equipos.length === 0) {
      console.log('⚠️ No se encontraron negocios o equipos. Ejecuta primero esos seeders.');
      return;
    }

    // Función para calcular el valor total (arrendamiento + IVA)
    const calcularValorTotal = (valorArrendamiento, tarifaIva) => {
      return valorArrendamiento + (valorArrendamiento * tarifaIva / 100);
    };

    // Crear array de relaciones negocio-equipo
    const negocioEquipos = [];
    
    // Negocio 1 - Proyecto Desarrollo Web (Juan Pérez)
    negocioEquipos.push({
      negocio_id: negocios[0].id,
      equipo_id: equipos[0].id, // Laptop Dell XPS 13
      valor_arrendamiento: 200000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(200000, 19)
    });
    
    negocioEquipos.push({
      negocio_id: negocios[0].id,
      equipo_id: equipos[1].id, // Laptop HP Spectre
      valor_arrendamiento: 180000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(180000, 19)
    });
    
    // Negocio 2 - Mantenimiento Servidores (Juan Pérez)
    negocioEquipos.push({
      negocio_id: negocios[1].id,
      equipo_id: equipos[3].id, // Servidor Dell PowerEdge
      valor_arrendamiento: 800000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(800000, 19)
    });
    
    // Negocio 3 - Diseño Identidad Corporativa (María González)
    negocioEquipos.push({
      negocio_id: negocios[2].id,
      equipo_id: equipos[2].id, // MacBook Pro M1
      valor_arrendamiento: 300000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(300000, 19)
    });
    
    negocioEquipos.push({
      negocio_id: negocios[2].id,
      equipo_id: equipos[5].id, // iPad Pro
      valor_arrendamiento: 150000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(150000, 19)
    });
    
    // Negocio 4 - Implementación CRM (Carlos Rodríguez)
    negocioEquipos.push({
      negocio_id: negocios[3].id,
      equipo_id: equipos[4].id, // Laptop Lenovo ThinkPad
      valor_arrendamiento: 220000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(220000, 19)
    });
    
    negocioEquipos.push({
      negocio_id: negocios[3].id,
      equipo_id: equipos[7].id, // PC de Escritorio HP
      valor_arrendamiento: 150000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(150000, 19)
    });
    
    // Negocio 5 - Desarrollo App Móvil (Ana Martínez)
    negocioEquipos.push({
      negocio_id: negocios[4].id,
      equipo_id: equipos[2].id, // MacBook Pro M1 (mismo equipo que en negocio 3, pero ese ya terminó)
      valor_arrendamiento: 320000,
      tarifa_iva: 19,
      valor_total: calcularValorTotal(320000, 19)
    });

    return queryInterface.bulkInsert('negocio_equipo', negocioEquipos);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('negocio_equipo', null, {});
  }
}; 