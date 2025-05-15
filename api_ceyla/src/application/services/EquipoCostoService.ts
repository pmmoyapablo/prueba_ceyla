import { IEquipoCostoRepository } from '@/domain/repositories/IEquipoCostoRepository';
import { CreateEquipoCostoDto } from '../dtos/CreateEquipoCostoDto';
import { IResponse } from '../Response';
import { Op } from 'sequelize';
import { IEquipoRepository } from '../../domain/repositories/IEquipoRepository';

export class EquipoCostoService {
  constructor(
    private equipoCostoRepository: IEquipoCostoRepository,
    private equipoRepository: IEquipoRepository
  ) {}

  async registrarCosto(dto: CreateEquipoCostoDto): Promise<IResponse> {
    try {
      // Verificar que el equipo existe
      const equipo = await this.equipoRepository.findById(dto.equipo_id);
      if (!equipo) {
        return {
          success: false,
          message: 'El equipo no existe',
          data: null
        };
      }

      // Crear el registro de costo
      const costo = await this.equipoCostoRepository.create({
        equipo_id: dto.equipo_id,
        fecha: dto.fecha,
        descripcion: dto.descripcion,
        valor: dto.valor,
        tipo: dto.tipo
      } as any);

      return {
        success: true,
        message: 'Costo registrado exitosamente',
        data: costo
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al registrar el costo',
        data: null
      };
    }
  }

  async getCostosByEquipo(equipo_id: number): Promise<IResponse> {
    try {
      const costos = await this.equipoCostoRepository.findByEquipoId(equipo_id);

      return {
        success: true,
        message: 'Costos encontrados',
        data: costos
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener los costos',
        data: null
      };
    }
  }

  async getCostosByTipo(tipo: 'MANTENIMIENTO' | 'ARREGLO'): Promise<IResponse> {
    try {
      const costos = await this.equipoCostoRepository.findAll();

      return {
        success: true,
        message: 'Costos encontrados',
        data: costos.filter(c => c.tipo === tipo)
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener los costos',
        data: null
      };
    }
  }

  async getCostosByFechaRange(fechaInicio: Date, fechaFin: Date): Promise<IResponse> {
    try {
      const costos = await this.equipoCostoRepository.findByDateRange(fechaInicio, fechaFin);

      return {
        success: true,
        message: 'Costos encontrados',
        data: costos
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener los costos',
        data: null
      };
    }
  }
} 