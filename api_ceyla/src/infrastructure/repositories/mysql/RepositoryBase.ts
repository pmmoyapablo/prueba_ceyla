import { IRepository } from '../../../domain/repositories/IRepository';
import pool from '../../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export abstract class RepositoryBase<T> implements IRepository<T> {
  protected tableName: string;
  
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async findAll(): Promise<T[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ${this.tableName}`);
      return rows as T[];
    } catch (error) {
      console.error(`Error al obtener todos los registros de ${this.tableName}:`, error);
      throw error;
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      return rows[0] as T;
    } catch (error) {
      console.error(`Error al obtener el registro con id ${id} de ${this.tableName}:`, error);
      throw error;
    }
  }

  async create(entity: T): Promise<T> {
    try {
      // Elimina el id si está presente y entity es un objeto (no se deben insertar IDs autoincrementales)
      const entityToInsert = { ...entity as object };
      if ('id' in entityToInsert) {
        delete (entityToInsert as any).id;
      }
      
      const columns = Object.keys(entityToInsert).join(', ');
      const placeholders = Object.keys(entityToInsert).map(() => '?').join(', ');
      const values = Object.values(entityToInsert);
      
      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
      
      const [result] = await pool.query<ResultSetHeader>(query, values);
      
      // Obtener la entidad recién creada con su ID
      const newEntity = {
        ...entity,
        id: result.insertId
      };
      
      return newEntity as T;
    } catch (error) {
      console.error(`Error al crear registro en ${this.tableName}:`, error);
      throw error;
    }
  }

  async update(id: number, entity: Partial<T>): Promise<boolean> {
    try {
      const entityToUpdate = { ...entity as object };
      
      // Asegurarse de no actualizar el id
      if ('id' in entityToUpdate) {
        delete (entityToUpdate as any).id;
      }
      
      if (Object.keys(entityToUpdate).length === 0) {
        return false; // No hay nada que actualizar
      }
      
      const setClause = Object.keys(entityToUpdate)
        .map(key => `${key} = ?`)
        .join(', ');
      
      const values = [...Object.values(entityToUpdate), id];
      
      const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
      
      const [result] = await pool.query<ResultSetHeader>(query, values);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar registro con id ${id} en ${this.tableName}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const [result] = await pool.query<ResultSetHeader>(query, [id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar registro con id ${id} de ${this.tableName}:`, error);
      throw error;
    }
  }
}
