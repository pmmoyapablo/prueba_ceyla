import { IFacturaRepository } from '../../domain/repositories/IFacturaRepository';
import { Factura } from '../../domain/entities/Factura';
import { IResponse } from '../Response';

export class FacturaService {
    constructor(private facturaRepository: IFacturaRepository) {}

    async getFacturas(): Promise<IResponse> {
        try {
            const facturas = await this.facturaRepository.findAll();
            return {
                success: true,
                message: 'Facturas encontradas',
                data: facturas
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener facturas',
                data: null
            };
        }
    }

    async getFacturaById(id: number): Promise<IResponse> {
        try {
            const factura = await this.facturaRepository.findById(id);
            if (!factura) {
                return {
                    success: false,
                    message: 'Factura no encontrada',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Factura encontrada',
                data: factura
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener factura',
                data: null
            };
        }
    }

    async createFactura(factura: Factura): Promise<IResponse> {
        try {
            const newFactura = await this.facturaRepository.create(factura);
            return {
                success: true,
                message: 'Factura creada exitosamente',
                data: newFactura
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear factura',
                data: null
            };
        }
    }

    async updateFactura(id: number, factura: Factura): Promise<IResponse> {
        try {
            const updatedFactura = await this.facturaRepository.update(id, factura);
            if (!updatedFactura) {
                return {
                    success: false,
                    message: 'Factura no encontrada',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Factura actualizada exitosamente',
                data: updatedFactura
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar factura',
                data: null
            };
        }
    }

    async deleteFactura(id: number): Promise<IResponse> {
        try {
            const result = await this.facturaRepository.delete(id);
            if (!result) {
                return {
                    success: false,
                    message: 'Factura no encontrada',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Factura eliminada exitosamente',
                data: true
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al eliminar factura',
                data: null
            };
        }
    }
} 