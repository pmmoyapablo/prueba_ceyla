import { EquipoCosto } from '../../../domain/entities/EquipoCosto';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';
import { Op } from 'sequelize';

export class EquipoCostoRepositoryDummie extends RepositoryBaseDummie<EquipoCosto> {
  private equiposCostos: EquipoCosto[] = [
    {
      id: 1,
      equipo_id: 1,
      fecha: new Date('2024-03-15'),
      descripcion: 'Cambio de teclado',
      valor: 150000,
      tipo: 'ARREGLO'
    },
    {
      id: 2,
      equipo_id: 1,
      fecha: new Date('2024-03-01'),
      descripcion: 'Limpieza general',
      valor: 80000,
      tipo: 'MANTENIMIENTO'
    },
    {
      id: 3,
      equipo_id: 2,
      fecha: new Date('2024-03-10'),
      descripcion: 'Cambio de disco duro',
      valor: 350000,
      tipo: 'ARREGLO'
    },
    {
      id: 4,
      equipo_id: 2,
      fecha: new Date('2024-03-05'),
      descripcion: 'Mantenimiento preventivo',
      valor: 420000,
      tipo: 'MANTENIMIENTO'
    },
    {
      id: 5,
      equipo_id: 3,
      fecha: new Date('2024-03-20'),
      descripcion: 'Cambio de pantalla',
      valor: 1500000,
      tipo: 'ARREGLO'
    }
  ];
  
  constructor() {
    super();
  }

  async findAll(options?: any): Promise<EquipoCosto[]> {
    if (options?.where) {
      return this.equiposCostos.filter(costo => {
        return Object.entries(options.where).every(([key, value]: [string, any]) => {
          if (key === 'fecha' && value[Op.between]) {
            const [inicio, fin] = value[Op.between];
            return costo.fecha >= inicio && costo.fecha <= fin;
          }
          return (costo as any)[key] === value;
        });
      });
    }
    return this.equiposCostos;
  }

  async findById(id: number): Promise<EquipoCosto | null> {
    const costo = this.equiposCostos.find(c => c.id === id);
    return costo || null;
  }

  // Métodos específicos para EquipoCosto
  async findByEquipoId(equipoId: number): Promise<EquipoCosto[]> {
    return this.equiposCostos.filter(c => c.equipo_id === equipoId);
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<EquipoCosto[]> {
    return this.equiposCostos.filter(c => 
      c.fecha >= fechaInicio && c.fecha <= fechaFin
    );
  }

  async getTotalCostosPorEquipo(equipoId: number): Promise<number> {
    const costos = this.equiposCostos.filter(c => c.equipo_id === equipoId);
    return costos.reduce((total, costo) => total + costo.valor, 0);
  }

  async create(data: Partial<EquipoCosto>): Promise<EquipoCosto> {
    const newCosto = {
      id: this.equiposCostos.length + 1,
      ...data
    } as EquipoCosto;
    
    this.equiposCostos.push(newCosto);
    return newCosto;
  }
} 