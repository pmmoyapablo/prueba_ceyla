import { EquipoCosto } from '../../../domain/entities/EquipoCosto';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class EquipoCostoRepositoryDummie extends RepositoryBaseDummie<EquipoCosto> {
  private equipoCostos: EquipoCosto[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.equipoCostos = [
      {
        id: 1,
        equipo_id: 1,
        fecha: new Date('2023-01-10'),
        descripcion: 'Mantenimiento preventivo',
        valor: 150000
      },
      {
        id: 2,
        equipo_id: 1,
        fecha: new Date('2023-06-15'),
        descripcion: 'Actualización de software',
        valor: 80000
      },
      {
        id: 3,
        equipo_id: 2,
        fecha: new Date('2023-02-05'),
        descripcion: 'Cambio de batería',
        valor: 350000
      },
      {
        id: 4,
        equipo_id: 3,
        fecha: new Date('2023-03-20'),
        descripcion: 'Ampliación de memoria RAM',
        valor: 420000
      },
      {
        id: 5,
        equipo_id: 4,
        fecha: new Date('2023-01-25'),
        descripcion: 'Actualización de servidor',
        valor: 1500000
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<EquipoCosto[]> {
    return this.equipoCostos;
  }

  async findById(id: number): Promise<EquipoCosto | null> {
    const costo = this.equipoCostos.find(c => c.id === id);
    return costo || null;
  }

  // Métodos específicos para EquipoCosto
  async findByEquipoId(equipoId: number): Promise<EquipoCosto[]> {
    return this.equipoCostos.filter(c => c.equipo_id === equipoId);
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<EquipoCosto[]> {
    return this.equipoCostos.filter(c => 
      c.fecha >= fechaInicio && c.fecha <= fechaFin
    );
  }

  async getTotalCostosPorEquipo(equipoId: number): Promise<number> {
    const costos = this.equipoCostos.filter(c => c.equipo_id === equipoId);
    return costos.reduce((total, costo) => total + costo.valor, 0);
  }
} 