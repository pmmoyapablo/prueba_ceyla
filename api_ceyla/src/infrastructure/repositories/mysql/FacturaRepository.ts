import { Factura } from '../../../domain/entities/Factura';
import { RepositoryBase } from './RepositoryBase';
import pool from '../../config/database';
import { RowDataPacket } from 'mysql2';
import { IFacturaRepository } from '../../../domain/repositories/IFacturaRepository';

export class FacturaRepository extends RepositoryBase<Factura> implements IFacturaRepository {
  constructor() {
    super('factura');
  }

  // Métodos específicos para Factura
  
  async findByNegocioId(negocioId: number): Promise<Factura[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM factura WHERE negocio_id = ? ORDER BY fecha_factura DESC',
        [negocioId]
      );
      
      return rows as Factura[];
    } catch (error) {
      console.error('Error al buscar facturas por negocio_id:', error);
      throw error;
    }
  }

  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Factura[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        'SELECT * FROM factura WHERE fecha_factura BETWEEN ? AND ? ORDER BY fecha_factura DESC',
        [fechaInicio, fechaFin]
      );
      
      return rows as Factura[];
    } catch (error) {
      console.error('Error al buscar facturas por rango de fechas:', error);
      throw error;
    }
  }

  async getTotalFacturadoPorNegocio(negocioId: number): Promise<number> {
    try {
      const [result] = await pool.query<RowDataPacket[]>(
        'SELECT SUM(valor_factura) as total FROM factura WHERE negocio_id = ?',
        [negocioId]
      );
      
      return result[0]?.total || 0;
    } catch (error) {
      console.error('Error al calcular el total facturado por negocio:', error);
      throw error;
    }
  }
} 