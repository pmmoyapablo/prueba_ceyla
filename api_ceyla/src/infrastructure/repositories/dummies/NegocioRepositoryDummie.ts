import { Negocio } from '../../../domain/entities/Negocio';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class NegocioRepositoryDummie extends RepositoryBaseDummie<Negocio> {
  private negocios: Negocio[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.negocios = [
      {
        id: 1,
        cliente_id: 1,
        nombre: 'Proyecto de Desarrollo Web',
        fecha_inicio: new Date('2023-01-15'),
        fecha_fin: new Date('2023-12-31')
      },
      {
        id: 2,
        cliente_id: 1,
        nombre: 'Mantenimiento de Servidores',
        fecha_inicio: new Date('2023-02-01'),
        fecha_fin: new Date('2099-12-31') // Fecha lejana para simular activo
      },
      {
        id: 3,
        cliente_id: 2,
        nombre: 'Diseño de Identidad Corporativa',
        fecha_inicio: new Date('2023-03-10'),
        fecha_fin: new Date('2023-06-30')
      },
      {
        id: 4,
        cliente_id: 3,
        nombre: 'Implementación de CRM',
        fecha_inicio: new Date('2023-05-01'),
        fecha_fin: new Date('2099-12-31') // Fecha lejana para simular activo
      },
      {
        id: 5,
        cliente_id: 4,
        nombre: 'Desarrollo de Aplicación Móvil',
        fecha_inicio: new Date('2023-04-15'),
        fecha_fin: new Date('2023-10-15')
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<Negocio[]> {
    return this.negocios;
  }

  async findById(id: number): Promise<Negocio | null> {
    const negocio = this.negocios.find(n => n.id === id);
    return negocio || null;
  }

  // Métodos específicos para Negocio
  async findByClienteId(clienteId: number): Promise<Negocio[]> {
    return this.negocios.filter(n => n.cliente_id === clienteId);
  }

  async findActiveNegocios(): Promise<Negocio[]> {
    const today = new Date();
    return this.negocios.filter(n => n.fecha_fin > today);
  }
} 