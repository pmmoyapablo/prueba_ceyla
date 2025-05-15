import { Equipo } from '../../../domain/entities/Equipo';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class EquipoRepositoryDummie extends RepositoryBaseDummie<Equipo> {
  private equipos: Equipo[] = [
    {
      id: 1,
      serial: "EQ001",
      referencia: "Laptop HP",
      valor_compra: 2500000
    },
    {
      id: 2,
      serial: "EQ002",
      referencia: "Desktop Dell",
      valor_compra: 1800000
    },
    {
      id: 3,
      serial: "EQ003",
      referencia: "Monitor LG",
      valor_compra: 800000
    }
  ];

  constructor() {
    super();
  }

  async findById(id: number): Promise<Equipo | null> {
    const equipo = this.equipos.find(e => e.id === id);
    return equipo || null;
  }

  async findAll(): Promise<Equipo[]> {
    return this.equipos;
  }

  async create(data: Partial<Equipo>): Promise<Equipo> {
    const newEquipo = {
      id: this.equipos.length + 1,
      ...data
    } as Equipo;
    
    this.equipos.push(newEquipo);
    return newEquipo;
  }

  // Métodos específicos para Equipo
  async findBySerial(serial: string): Promise<Equipo | null> {
    const equipo = this.equipos.find(e => e.serial === serial);
    return equipo || null;
  }

  async findByReferencia(referencia: string): Promise<Equipo[]> {
    return this.equipos.filter(e => e.referencia.includes(referencia));
  }

  async findDisponibles(): Promise<Equipo[]> {
    // Para pruebas, retornar sólo los dos primeros equipos como "disponibles"
    return this.equipos.slice(0, 2);
  }
} 