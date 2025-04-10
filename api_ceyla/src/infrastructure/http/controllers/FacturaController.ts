import { Request, Response as ExpressResponse } from 'express';
import { FacturaService } from '../../../application/services/FacturaService';
import { Factura } from '../../../domain/entities/Factura';

export class FacturaController {
    constructor(private facturaService: FacturaService) {}

    async getFacturas(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const result = await this.facturaService.getFacturas();
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async getFacturaById(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.facturaService.getFacturaById(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async createFactura(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const factura: Factura = req.body;
            const result = await this.facturaService.createFactura(factura);
            res.status(result.success ? 201 : 400).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async updateFactura(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const factura: Factura = req.body;
            const result = await this.facturaService.updateFactura(id, factura);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }

    async deleteFactura(req: Request, res: ExpressResponse): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const result = await this.facturaService.deleteFactura(id);
            res.status(result.success ? 200 : 404).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
        }
    }
} 