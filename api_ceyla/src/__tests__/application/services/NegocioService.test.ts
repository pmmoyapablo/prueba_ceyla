import { NegocioService } from '../../../application/services/NegocioService';
import { INegocioRepository } from '../../../domain/repositories/INegocioRepository';
import { Negocio } from '../../../domain/entities/Negocio';

describe('NegocioService', () => {
    let negocioService: NegocioService;
    let mockNegocioRepository: jest.Mocked<INegocioRepository>;

    beforeEach(() => {
        mockNegocioRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByClienteId: jest.fn(),
            findActiveNegocios: jest.fn()
        };
        negocioService = new NegocioService(mockNegocioRepository);
    });

    describe('getNegocios', () => {
        it('should return all businesses', async () => {
            const mockNegocios: Negocio[] = [
                new Negocio(1, 1, 'Negocio 1', new Date(), new Date())
            ];

            mockNegocioRepository.findAll.mockResolvedValue(mockNegocios);

            const result = await negocioService.getNegocios();

            expect(result.success).toBe(true);
            expect(result.message).toBe('Negocios encontrados');
            expect(result.data).toEqual(mockNegocios);
            expect(mockNegocioRepository.findAll).toHaveBeenCalled();
        });

        it('should handle errors when getting businesses', async () => {
            mockNegocioRepository.findAll.mockRejectedValue(new Error('Database error'));

            const result = await negocioService.getNegocios();

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al obtener negocios');
            expect(result.data).toBeNull();
        });
    });

    describe('getNegocioById', () => {
        it('should return a business by id', async () => {
            const mockNegocio = new Negocio(1, 1, 'Negocio 1', new Date(), new Date());

            mockNegocioRepository.findById.mockResolvedValue(mockNegocio);

            const result = await negocioService.getNegocioById(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Negocio encontrado');
            expect(result.data).toEqual(mockNegocio);
            expect(mockNegocioRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should return not found when business does not exist', async () => {
            mockNegocioRepository.findById.mockResolvedValue(null);

            const result = await negocioService.getNegocioById(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Negocio no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('createNegocio', () => {
        it('should create a new business', async () => {
            const newNegocio = new Negocio(1, 1, 'Nuevo Negocio', new Date(), new Date());

            mockNegocioRepository.create.mockResolvedValue(newNegocio);

            const result = await negocioService.createNegocio(newNegocio);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Negocio creado exitosamente');
            expect(result.data).toEqual(newNegocio);
            expect(mockNegocioRepository.create).toHaveBeenCalledWith(newNegocio);
        });

        it('should handle errors when creating a business', async () => {
            const newNegocio = new Negocio(1, 1, 'Nuevo Negocio', new Date(), new Date());

            mockNegocioRepository.create.mockRejectedValue(new Error('Database error'));

            const result = await negocioService.createNegocio(newNegocio);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al crear negocio');
            expect(result.data).toBeNull();
        });
    });

    describe('updateNegocio', () => {
        it('should update an existing business', async () => {
            const updatedNegocio = new Negocio(1, 1, 'Negocio Actualizado', new Date(), new Date());

            mockNegocioRepository.update.mockResolvedValue(true);

            const result = await negocioService.updateNegocio(1, updatedNegocio);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Negocio actualizado exitosamente');
            expect(result.data).toEqual(updatedNegocio);
            expect(mockNegocioRepository.update).toHaveBeenCalledWith(1, updatedNegocio);
        });

        it('should return not found when updating non-existent business', async () => {
            const updatedNegocio = new Negocio(1, 1, 'Negocio Actualizado', new Date(), new Date());

            mockNegocioRepository.update.mockResolvedValue(false);

            const result = await negocioService.updateNegocio(1, updatedNegocio);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Negocio no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('deleteNegocio', () => {
        it('should delete an existing business', async () => {
            mockNegocioRepository.delete.mockResolvedValue(true);

            const result = await negocioService.deleteNegocio(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Negocio eliminado exitosamente');
            expect(result.data).toBe(true);
            expect(mockNegocioRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should return not found when deleting non-existent business', async () => {
            mockNegocioRepository.delete.mockResolvedValue(false);

            const result = await negocioService.deleteNegocio(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Negocio no encontrado');
            expect(result.data).toBeNull();
        });
    });
}); 