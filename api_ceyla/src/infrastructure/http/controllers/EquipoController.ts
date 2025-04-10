import { Request, Response as ExpressResponse } from 'express';
import { EquipoService } from '../../../application/services/EquipoService';
import { Equipo } from '../../../domain/entities/Equipo';

export class EquipoController {
    constructor(private equipoService: EquipoService) {}

    async getEquipos(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const result = await this.equipoService.getEquipos();
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async getEquipoById(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.equipoService.getEquipoById(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async createEquipo(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const equipo: Equipo = req.body;
            const result = await this.equipoService.createEquipo(equipo);
            res.status(result.success ? 201 : 400).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async updateEquipo(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const equipo: Equipo = req.body;
            const result = await this.equipoService.updateEquipo(id, equipo);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async deleteEquipo(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.equipoService.deleteEquipo(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }
} 