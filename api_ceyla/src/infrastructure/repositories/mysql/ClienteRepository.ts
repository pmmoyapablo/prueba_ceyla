import { Cliente } from '../../../domain/entities/Cliente';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';

export class ClienteRepository extends RepositoryBase<Cliente> implements IClienteRepository{
  constructor() {
    super('cliente');
  }

  // Métodos específicos para Cliente
  
  async findByEmail(email: string): Promise<Cliente | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM cliente WHERE email = ?',
        [email]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0] as Cliente;
    } catch (error) {
      console.error('Error al buscar cliente por email:', error);
      throw error;
    }
  }

  async findByNumeroDocumento(numeroDocumento: number): Promise<Cliente | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM cliente WHERE numero_documento = ?',
        [numeroDocumento]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0] as Cliente;
    } catch (error) {
      console.error('Error al buscar cliente por número de documento:', error);
      throw error;
    }
  }
}