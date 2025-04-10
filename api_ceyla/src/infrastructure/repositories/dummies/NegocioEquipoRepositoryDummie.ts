import { NegocioEquipo } from '../../../domain/entities/NegocioEquipo';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class NegocioEquipoRepositoryDummie extends RepositoryBaseDummie<NegocioEquipo> {
  private negocioEquipos: NegocioEquipo[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.negocioEquipos = [
      {
        id: 1,
        negocio_id: 1,
        equipo_id: 1,
        valor_arrendamiento: 200000,
        tarifa_iva: 19,
        valor_total: 238000
      },
      {
        id: 2,
        negocio_id: 1,
        equipo_id: 2,
        valor_arrendamiento: 180000,
        tarifa_iva: 19,
        valor_total: 214200
      },
      {
        id: 3,
        negocio_id: 2,
        equipo_id: 4,
        valor_arrendamiento: 800000,
        tarifa_iva: 19,
        valor_total: 952000
      },
      {
        id: 4,
        negocio_id: 3,
        equipo_id: 3,
        valor_arrendamiento: 300000,
        tarifa_iva: 19,
        valor_total: 357000
      },
      {
        id: 5,
        negocio_id: 4,
        equipo_id: 2,
        valor_arrendamiento: 220000,
        tarifa_iva: 19,
        valor_total: 261800
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<NegocioEquipo[]> {
    return this.negocioEquipos;
  }

  async findById(id: number): Promise<NegocioEquipo | null> {
    const negocioEquipo = this.negocioEquipos.find(ne => ne.id === id);
    return negocioEquipo || null;
  }

  // Métodos específicos para NegocioEquipo
  async findByNegocioId(negocioId: number): Promise<NegocioEquipo[]> {
    return this.negocioEquipos.filter(ne => ne.negocio_id === negocioId);
  }

  async findByEquipoId(equipoId: number): Promise<NegocioEquipo[]> {
    return this.negocioEquipos.filter(ne => ne.equipo_id === equipoId);
  }

  async getEquiposConNegocioActivo(): Promise<NegocioEquipo[]> {
    // Para simplificar, consideramos los primeros 3 como activos (negocios 1 y 2)
    return this.negocioEquipos.slice(0, 3);
  }

  async getTotalValorArrendamientoPorNegocio(negocioId: number): Promise<number> {
    const equipos = this.negocioEquipos.filter(ne => ne.negocio_id === negocioId);
    return equipos.reduce((total, equipo) => total + equipo.valor_arrendamiento, 0);
  }
} 