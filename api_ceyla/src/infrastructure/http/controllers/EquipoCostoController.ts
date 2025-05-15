import { Request, Response } from 'express';
import { EquipoCostoService } from '../../../application/services/EquipoCostoService';
import { CreateEquipoCostoDto } from '../../../application/dtos/CreateEquipoCostoDto';

export class EquipoCostoController {
  constructor(private equipoCostoService: EquipoCostoService) {}

  async registrarCosto(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateEquipoCostoDto = req.body;
      const result = await this.equipoCostoService.registrarCosto(dto);
      
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  async getCostosByEquipo(req: Request, res: Response): Promise<void> {
    try {
      const equipo_id = parseInt(req.params.equipo_id);
      const result = await this.equipoCostoService.getCostosByEquipo(equipo_id);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  async getCostosByTipo(req: Request, res: Response): Promise<void> {
    try {
      const tipo = req.params.tipo as 'MANTENIMIENTO' | 'ARREGLO';
      const result = await this.equipoCostoService.getCostosByTipo(tipo);
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  async getCostosByFechaRange(req: Request, res: Response): Promise<void> {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const result = await this.equipoCostoService.getCostosByFechaRange(
        new Date(fechaInicio as string),
        new Date(fechaFin as string)
      );
      
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }
} 