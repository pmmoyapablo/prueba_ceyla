import { Negocio } from '../../../domain/entities/Negocio';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';

export class NegocioRepository extends RepositoryBase<Negocio> {
  constructor() {
    super('negocio');
  }

  // Métodos específicos para Negocio
  
  async findByClienteId(clienteId: number): Promise<Negocio[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM negocio WHERE cliente_id = ?',
        [clienteId]
      );
      
      return rows as Negocio[];
    } catch (error) {
      console.error('Error al buscar negocios por cliente_id:', error);
      throw error;
    }
  }

  async findActiveNegocios(): Promise<Negocio[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM negocio WHERE fecha_fin IS NULL OR fecha_fin > CURDATE()'
      );
      
      return rows as Negocio[];
    } catch (error) {
      console.error('Error al buscar negocios activos:', error);
      throw error;
    }
  }
} 