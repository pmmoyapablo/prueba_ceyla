import { Factura } from '../../../domain/entities/Factura';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class FacturaRepositoryDummie extends RepositoryBaseDummie<Factura> {
  private facturas: Factura[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.facturas = [
      {
        id: 1,
        negocio_id: 1,
        fecha_factura: new Date('2023-02-01'),
        valor_factura: 476000
      },
      {
        id: 2,
        negocio_id: 1,
        fecha_factura: new Date('2023-03-01'),
        valor_factura: 476000
      },
      {
        id: 3,
        negocio_id: 2,
        fecha_factura: new Date('2023-03-01'),
        valor_factura: 952000
      },
      {
        id: 4,
        negocio_id: 2,
        fecha_factura: new Date('2023-04-01'),
        valor_factura: 952000
      },
      {
        id: 5,
        negocio_id: 3,
        fecha_factura: new Date('2023-04-01'),
        valor_factura: 535500
      },
      {
        id: 6,
        negocio_id: 4,
        fecha_factura: new Date('2023-06-01'),
        valor_factura: 440300
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<Factura[]> {
    return this.facturas;
  }

  async findById(id: number): Promise<Factura | null> {
    const factura = this.facturas.find(f => f.id === id);
    return factura || null;
  }

  // Métodos específicos para Factura
  async findByNegocioId(negocioId: number): Promise<Factura[]> {
    return this.facturas.filter(f => f.negocio_id === negocioId);
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Factura[]> {
    return this.facturas.filter(f => 
      f.fecha_factura >= fechaInicio && f.fecha_factura <= fechaFin
    );
  }

  async getTotalFacturadoPorNegocio(negocioId: number): Promise<number> {
    const facturas = this.facturas.filter(f => f.negocio_id === negocioId);
    return facturas.reduce((total, factura) => total + factura.valor_factura, 0);
  }
} 