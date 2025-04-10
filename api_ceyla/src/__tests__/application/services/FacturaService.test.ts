import { FacturaService } from '../../../application/services/FacturaService';
import { IFacturaRepository } from '../../../domain/repositories/IFacturaRepository';
import { Factura } from '../../../domain/entities/Factura';

describe('FacturaService', () => {
    let facturaService: FacturaService;
    let mockFacturaRepository: jest.Mocked<IFacturaRepository>;

    beforeEach(() => {
        mockFacturaRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByNegocioId: jest.fn(),
            findByDateRange: jest.fn(),
            getTotalFacturadoPorNegocio: jest.fn()
        };
        facturaService = new FacturaService(mockFacturaRepository);
    });

    describe('getFacturas', () => {
        it('should return all invoices', async () => {
            const mockFacturas: Factura[] = [
                new Factura(1, 1, new Date(), 1000)
            ];

            mockFacturaRepository.findAll.mockResolvedValue(mockFacturas);

            const result = await facturaService.getFacturas();

            expect(result.success).toBe(true);
            expect(result.message).toBe('Facturas encontradas');
            expect(result.data).toEqual(mockFacturas);
            expect(mockFacturaRepository.findAll).toHaveBeenCalled();
        });

        it('should handle errors when getting invoices', async () => {
            mockFacturaRepository.findAll.mockRejectedValue(new Error('Database error'));

            const result = await facturaService.getFacturas();

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al obtener facturas');
            expect(result.data).toBeNull();
        });
    });

    describe('getFacturaById', () => {
        it('should return an invoice by id', async () => {
            const mockFactura = new Factura(1, 1, new Date(), 1000);

            mockFacturaRepository.findById.mockResolvedValue(mockFactura);

            const result = await facturaService.getFacturaById(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Factura encontrada');
            expect(result.data).toEqual(mockFactura);
            expect(mockFacturaRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should return not found when invoice does not exist', async () => {
            mockFacturaRepository.findById.mockResolvedValue(null);

            const result = await facturaService.getFacturaById(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Factura no encontrada');
            expect(result.data).toBeNull();
        });
    });

    describe('createFactura', () => {
        it('should create a new invoice', async () => {
            const newFactura = new Factura(1, 1, new Date(), 2000);

            mockFacturaRepository.create.mockResolvedValue(newFactura);

            const result = await facturaService.createFactura(newFactura);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Factura creada exitosamente');
            expect(result.data).toEqual(newFactura);
            expect(mockFacturaRepository.create).toHaveBeenCalledWith(newFactura);
        });

        it('should handle errors when creating an invoice', async () => {
            const newFactura = new Factura(1, 1, new Date(), 2000);

            mockFacturaRepository.create.mockRejectedValue(new Error('Database error'));

            const result = await facturaService.createFactura(newFactura);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al crear factura');
            expect(result.data).toBeNull();
        });
    });

    describe('updateFactura', () => {
        it('should update an existing invoice', async () => {
            const updatedFactura = new Factura(1, 1, new Date(), 1500);

            mockFacturaRepository.update.mockResolvedValue(true);

            const result = await facturaService.updateFactura(1, updatedFactura);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Factura actualizada exitosamente');
            expect(result.data).toEqual(updatedFactura);
            expect(mockFacturaRepository.update).toHaveBeenCalledWith(1, updatedFactura);
        });

        it('should return not found when updating non-existent invoice', async () => {
            const updatedFactura = new Factura(1, 1, new Date(), 1500);

            mockFacturaRepository.update.mockResolvedValue(false);

            const result = await facturaService.updateFactura(1, updatedFactura);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Factura no encontrada');
            expect(result.data).toBeNull();
        });
    });

    describe('deleteFactura', () => {
        it('should delete an existing invoice', async () => {
            mockFacturaRepository.delete.mockResolvedValue(true);

            const result = await facturaService.deleteFactura(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Factura eliminada exitosamente');
            expect(result.data).toBe(true);
            expect(mockFacturaRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should return not found when deleting non-existent invoice', async () => {
            mockFacturaRepository.delete.mockResolvedValue(false);

            const result = await facturaService.deleteFactura(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Factura no encontrada');
            expect(result.data).toBeNull();
        });
    });
}); 