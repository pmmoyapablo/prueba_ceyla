'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero, obtener los IDs de los equipos insertados
    const equipos = await queryInterface.sequelize.query(
      'SELECT id FROM equipo',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (equipos.length === 0) {
      console.log('⚠️ No se encontraron equipos. Ejecuta primero el seeder de equipos.');
      return;
    }

    // Crear array de costos de equipos
    const equipoCostos = [];
    
    // Costos para el equipo 1
    equipoCostos.push({
      equipo_id: equipos[0].id,
      fecha: new Date('2023-01-10'),
      descripcion: 'Mantenimiento preventivo',
      valor: 150000
    });
    
    equipoCostos.push({
      equipo_id: equipos[0].id,
      fecha: new Date('2023-06-15'),
      descripcion: 'Actualización de software',
      valor: 80000
    });
    
    // Costos para el equipo 2
    equipoCostos.push({
      equipo_id: equipos[1].id,
      fecha: new Date('2023-02-05'),
      descripcion: 'Cambio de batería',
      valor: 350000
    });
    
    // Costos para el equipo 3
    equipoCostos.push({
      equipo_id: equipos[2].id,
      fecha: new Date('2023-03-20'),
      descripcion: 'Ampliación de memoria RAM',
      valor: 420000
    });
    
    // Costos para el equipo 4
    equipoCostos.push({
      equipo_id: equipos[3].id,
      fecha: new Date('2023-01-25'),
      descripcion: 'Actualización de servidor',
      valor: 1500000
    });
    
    equipoCostos.push({
      equipo_id: equipos[3].id,
      fecha: new Date('2023-07-10'),
      descripcion: 'Mantenimiento refrigeración',
      valor: 320000
    });
    
    // Costos para el equipo 5
    equipoCostos.push({
      equipo_id: equipos[4].id,
      fecha: new Date('2023-04-05'),
      descripcion: 'Reparación teclado',
      valor: 180000
    });

    return queryInterface.bulkInsert('equipo_costo', equipoCostos);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('equipo_costo', null, {});
  }
}; 