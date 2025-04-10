import { FacturaDetalle } from '../../../domain/entities/FacturaDetalle';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class FacturaDetalleRepositoryDummie extends RepositoryBaseDummie<FacturaDetalle> {
  private facturaDetalles: FacturaDetalle[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.facturaDetalles = [
      {
        id: 1,
        factura_id: 1,
        negocio_equipo_id: 1,
        valor: 238000
      },
      {
        id: 2,
        factura_id: 1,
        negocio_equipo_id: 2,
        valor: 214200
      },
      {
        id: 3,
        factura_id: 2,
        negocio_equipo_id: 1,
        valor: 238000
      },
      {
        id: 4,
        factura_id: 2,
        negocio_equipo_id: 2,
        valor: 214200
      },
      {
        id: 5,
        factura_id: 3,
        negocio_equipo_id: 3,
        valor: 952000
      },
      {
        id: 6,
        factura_id: 4,
        negocio_equipo_id: 3,
        valor: 952000
      },
      {
        id: 7,
        factura_id: 5,
        negocio_equipo_id: 4,
        valor: 357000
      },
      {
        id: 8,
        factura_id: 6,
        negocio_equipo_id: 5,
        valor: 261800
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<FacturaDetalle[]> {
    return this.facturaDetalles;
  }

  async findById(id: number): Promise<FacturaDetalle | null> {
    const detalle = this.facturaDetalles.find(fd => fd.id === id);
    return detalle || null;
  }

  // Métodos específicos para FacturaDetalle
  async findByFacturaId(facturaId: number): Promise<FacturaDetalle[]> {
    return this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
  }

  async findByNegocioEquipoId(negocioEquipoId: number): Promise<FacturaDetalle[]> {
    return this.facturaDetalles.filter(fd => fd.negocio_equipo_id === negocioEquipoId);
  }

  async getTotalValorPorFactura(facturaId: number): Promise<number> {
    const detalles = this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
    return detalles.reduce((total, detalle) => total + detalle.valor, 0);
  }

  async getDetallesConInfoEquipo(facturaId: number): Promise<any[]> {
    // Simulamos info adicional para los detalles de la factura
    const detalles = this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
    
    return detalles.map(detalle => {
      // Datos ficticios para simular info de equipo
      const equipoInfo = {
        ...detalle,
        valor_arrendamiento: detalle.valor / 1.19, // Aproximación
        tarifa_iva: 19,
        serial: `SN-00${detalle.negocio_equipo_id}`,
        referencia: `Equipo de prueba ${detalle.negocio_equipo_id}`
      };
      
      return equipoInfo;
    });
  }
} 