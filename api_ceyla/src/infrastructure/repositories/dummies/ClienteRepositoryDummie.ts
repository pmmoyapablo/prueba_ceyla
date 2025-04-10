import { Cliente } from '../../../domain/entities/Cliente';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { RepositoryBaseDummie } from './RepositoryBaseDummie';

export class ClienteRepositoryDummie extends RepositoryBaseDummie<Cliente> implements IClienteRepository {
  private clientes: Cliente[];
  
  constructor() {
    super();
    // Datos hardcodeados para pruebas
    this.clientes = [
      {
        id: 1,
        numero_documento: 123456789,
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '3001234567'
      },
      {
        id: 2,
        numero_documento: 987654321,
        nombre: 'María',
        apellido: 'González',
        email: 'maria.gonzalez@example.com',
        telefono: '3109876543'
      },
      {
        id: 3,
        numero_documento: 555666777,
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        email: 'carlos.rodriguez@example.com',
        telefono: '3205557777'
      },
      {
        id: 4,
        numero_documento: 111222333,
        nombre: 'Ana',
        apellido: 'Martínez',
        email: 'ana.martinez@example.com',
        telefono: '3151112222'
      },
      {
        id: 5,
        numero_documento: 444555666,
        nombre: 'Pedro',
        apellido: 'López',
        email: 'pedro.lopez@example.com',
        telefono: '3004445555'
      }
    ];
  }

  // Sobrescribir métodos de la clase base para usar datos hardcodeados
  async findAll(): Promise<Cliente[]> {
    return this.clientes;
  }

  async findById(id: number): Promise<Cliente | null> {
    const cliente = this.clientes.find(c => c.id === id);
    return cliente || null;
  }

  // Métodos específicos para Cliente
  async findByEmail(email: string): Promise<Cliente | null> {
    const cliente = this.clientes.find(c => c.email === email);
    return cliente || null;
  }

  async findByNumeroDocumento(numeroDocumento: number): Promise<Cliente | null> {
    const cliente = this.clientes.find(c => c.numero_documento === numeroDocumento);
    return cliente || null;
  }
}