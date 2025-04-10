import { FacturaDetalle } from '../../../domain/entities/FacturaDetalle';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { IFacturaDetalleRepository } from '../../../domain/repositories/IFacturaDetalleRepository';

export class FacturaDetalleRepository extends RepositoryBase<FacturaDetalle> implements IFacturaDetalleRepository {
  constructor() {
    super('factura_detalle');
  }

  // Métodos específicos para FacturaDetalle
  
  async findByFacturaId(facturaId: number): Promise<FacturaDetalle[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM factura_detalle WHERE factura_id = ?',
        [facturaId]
      );
      
      return rows as FacturaDetalle[];
    } catch (error) {
      console.error('Error al buscar detalles por factura_id:', error);
      throw error;
    }
  }

  async findByNegocioEquipoId(negocioEquipoId: number): Promise<FacturaDetalle[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM factura_detalle WHERE negocio_equipo_id = ?',
        [negocioEquipoId]
      );
      
      return rows as FacturaDetalle[];
    } catch (error) {
      console.error('Error al buscar detalles por negocio_equipo_id:', error);
      throw error;
    }
  }

  async getTotalValorPorFactura(facturaId: number): Promise<number> {
    try {
      const [result] = await pool.query<RowDataPacket[]>(
        'SELECT SUM(valor) as total FROM factura_detalle WHERE factura_id = ?',
        [facturaId]
      );
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error al calcular el total de valor por factura:', error);
      throw error;
    }
  }

  async getDetallesConInfoEquipo(facturaId: number): Promise<any[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT fd.*, ne.valor_arrendamiento, ne.tarifa_iva, e.serial, e.referencia
         FROM factura_detalle fd
         JOIN negocio_equipo ne ON fd.negocio_equipo_id = ne.id
         JOIN equipo e ON ne.equipo_id = e.id
         WHERE fd.factura_id = ?`,
        [facturaId]
      );
      
      return rows as any[];
    } catch (error) {
      console.error('Error al obtener detalles con información de equipo:', error);
      throw error;
    }
  }
} 