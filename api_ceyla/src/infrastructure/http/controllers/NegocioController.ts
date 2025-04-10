import { Request, Response as ExpressResponse } from 'express';
import { NegocioService } from '../../../application/services/NegocioService';
import { Negocio } from '../../../domain/entities/Negocio';

export class NegocioController {
    constructor(private negocioService: NegocioService) {}

    async getNegocios(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const result = await this.negocioService.getNegocios();
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async getNegocioById(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.negocioService.getNegocioById(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async createNegocio(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const negocio: Negocio = req.body;
            const result = await this.negocioService.createNegocio(negocio);
            res.status(result.success ? 201 : 400).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async updateNegocio(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const negocio: Negocio = req.body;
            const result = await this.negocioService.updateNegocio(id, negocio);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async deleteNegocio(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.negocioService.deleteNegocio(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }
} 