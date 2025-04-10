import { EquipoCosto } from '../../../domain/entities/EquipoCosto';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { IEquipoCostoRepository } from '../../../domain/repositories/IEquipoCostoRepository';

export class EquipoCostoRepository extends RepositoryBase<EquipoCosto> implements IEquipoCostoRepository {
  constructor() {
    super('equipo_costo');
  }

  // Métodos específicos para EquipoCosto
  
  async findByEquipoId(equipoId: number): Promise<EquipoCosto[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM equipo_costo WHERE equipo_id = ? ORDER BY fecha DESC',
        [equipoId]
      );
      
      return rows as EquipoCosto[];
    } catch (error) {
      console.error('Error al buscar costos por equipo_id:', error);
      throw error;
    }
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<EquipoCosto[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM equipo_costo WHERE fecha BETWEEN ? AND ? ORDER BY fecha DESC',
        [fechaInicio, fechaFin]
      );
      
      return rows as EquipoCosto[];
    } catch (error) {
      console.error('Error al buscar costos por rango de fechas:', error);
      throw error;
    }
  }

  async getTotalCostosPorEquipo(equipoId: number): Promise<number> {
    try {
      const [result] = await pool.query<RowDataPacket[]>(
        'SELECT SUM(valor) as total FROM equipo_costo WHERE equipo_id = ?',
        [equipoId]
      );
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error al calcular el total de costos por equipo:', error);
      throw error;
    }
  }
} 