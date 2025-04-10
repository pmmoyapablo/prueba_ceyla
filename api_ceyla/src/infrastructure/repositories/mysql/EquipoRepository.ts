import { Equipo } from '../../../domain/entities/Equipo';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { IEquipoRepository } from '../../../domain/repositories/IEquipoRepository';

export class EquipoRepository extends RepositoryBase<Equipo> implements IEquipoRepository {
  constructor() {
    super('equipo');
  }

  // Métodos específicos para Equipo
  
  async findBySerial(serial: string): Promise<Equipo | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM equipo WHERE serial = ?',
        [serial]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0] as Equipo;
    } catch (error) {
      console.error('Error al buscar equipo por serial:', error);
      throw error;
    }
  }

  async findByReferencia(referencia: string): Promise<Equipo[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM equipo WHERE referencia LIKE ?',
        [`%${referencia}%`]
      );
      
      return rows as Equipo[];
    } catch (error) {
      console.error('Error al buscar equipos por referencia:', error);
      throw error;
    }
  }

  async findDisponibles(): Promise<Equipo[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT e.* FROM equipo e
         LEFT JOIN negocio_equipo ne ON e.id = ne.equipo_id
         WHERE ne.id IS NULL OR ne.equipo_id NOT IN (
           SELECT equipo_id FROM negocio_equipo
           JOIN negocio n ON negocio_equipo.negocio_id = n.id
           WHERE n.fecha_fin IS NULL OR n.fecha_fin > CURDATE()
         )`
      );
      
      return rows as Equipo[];
    } catch (error) {
      console.error('Error al buscar equipos disponibles:', error);
      throw error;
    }
  }
} 