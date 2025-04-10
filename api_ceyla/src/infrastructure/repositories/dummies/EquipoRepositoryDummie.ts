import { Equipo } from '../../../domain/entities/Equipo';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class EquipoRepositoryDummie extends RepositoryBaseDummie<Equipo> {
  private equipos: Equipo[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.equipos = [
      {
        id: 1,
        serial: 'SN-001-2023',
        referencia: 'Laptop Dell XPS 13',
        valor_compra: 4500000
      },
      {
        id: 2,
        serial: 'SN-002-2023',
        referencia: 'Laptop HP Spectre x360',
        valor_compra: 3800000
      },
      {
        id: 3,
        serial: 'SN-003-2023',
        referencia: 'MacBook Pro M1',
        valor_compra: 5200000
      },
      {
        id: 4,
        serial: 'SN-004-2023',
        referencia: 'Servidor Dell PowerEdge',
        valor_compra: 12000000
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<Equipo[]> {
    return this.equipos;
  }

  async findById(id: number): Promise<Equipo | null> {
    const equipo = this.equipos.find(e => e.id === id);
    return equipo || null;
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