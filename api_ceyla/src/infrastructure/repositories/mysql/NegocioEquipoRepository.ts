import { NegocioEquipo } from '../../../domain/entities/NegocioEquipo';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { INegocioEquipoRepository } from '../../../domain/repositories/INegocioEquipoRepository';

export class NegocioEquipoRepository extends RepositoryBase<NegocioEquipo> implements INegocioEquipoRepository {
  constructor() {
    super('negocio_equipo');
  }

  // Métodos específicos para NegocioEquipo
  
  async findByNegocioId(negocioId: number): Promise<NegocioEquipo[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM negocio_equipo WHERE negocio_id = ?',
        [negocioId]
      );
      
      return rows as NegocioEquipo[];
    } catch (error) {
      console.error('Error al buscar relaciones por negocio_id:', error);
      throw error;
    }
  }

  async findByEquipoId(equipoId: number): Promise<NegocioEquipo[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM negocio_equipo WHERE equipo_id = ?',
        [equipoId]
      );
      
      return rows as NegocioEquipo[];
    } catch (error) {
      console.error('Error al buscar relaciones por equipo_id:', error);
      throw error;
    }
  }

  async getEquiposConNegocioActivo(): Promise<NegocioEquipo[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT ne.* FROM negocio_equipo ne
         JOIN negocio n ON ne.negocio_id = n.id
         WHERE n.fecha_fin IS NULL OR n.fecha_fin > CURDATE()`
      );
      
      return rows as NegocioEquipo[];
    } catch (error) {
      console.error('Error al buscar equipos con negocio activo:', error);
      throw error;
    }
  }

  async getTotalValorArrendamientoPorNegocio(negocioId: number): Promise<number> {
    try {
      const [result] = await pool.query<RowDataPacket[]>(
        'SELECT SUM(valor_arrendamiento) as total FROM negocio_equipo WHERE negocio_id = ?',
        [negocioId]
      );
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error al calcular el total de arrendamiento por negocio:', error);
      throw error;
    }
  }
} 