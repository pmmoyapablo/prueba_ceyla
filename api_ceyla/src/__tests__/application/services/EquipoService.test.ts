import { EquipoService } from '../../../application/services/EquipoService';
import { IEquipoRepository } from '../../../domain/repositories/IEquipoRepository';
import { Equipo } from '../../../domain/entities/Equipo';

describe('EquipoService', () => {
    let equipoService: EquipoService;
    let mockEquipoRepository: jest.Mocked<IEquipoRepository>;

    beforeEach(() => {
        mockEquipoRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findBySerial: jest.fn(),
            findByReferencia: jest.fn(),
            findDisponibles: jest.fn()
        };
        equipoService = new EquipoService(mockEquipoRepository);
    });

    describe('getEquipos', () => {
        it('should return all equipment', async () => {
            const mockEquipos: Equipo[] = [
                new Equipo(1, 'SER001', 'REF001', 1000)
            ];

            mockEquipoRepository.findAll.mockResolvedValue(mockEquipos);

            const result = await equipoService.getEquipos();

            expect(result.success).toBe(true);
            expect(result.message).toBe('Equipos encontrados');
            expect(result.data).toEqual(mockEquipos);
            expect(mockEquipoRepository.findAll).toHaveBeenCalled();
        });

        it('should handle errors when getting equipment', async () => {
            mockEquipoRepository.findAll.mockRejectedValue(new Error('Database error'));

            const result = await equipoService.getEquipos();

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al obtener equipos');
            expect(result.data).toBeNull();
        });
    });

    describe('getEquipoById', () => {
        it('should return an equipment by id', async () => {
            const mockEquipo = new Equipo(1, 'SER001', 'REF001', 1000);

            mockEquipoRepository.findById.mockResolvedValue(mockEquipo);

            const result = await equipoService.getEquipoById(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Equipo encontrado');
            expect(result.data).toEqual(mockEquipo);
            expect(mockEquipoRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should return not found when equipment does not exist', async () => {
            mockEquipoRepository.findById.mockResolvedValue(null);

            const result = await equipoService.getEquipoById(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Equipo no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('createEquipo', () => {
        it('should create a new equipment', async () => {
            const newEquipo = new Equipo(1, 'SER002', 'REF002', 2000);

            mockEquipoRepository.create.mockResolvedValue(newEquipo);

            const result = await equipoService.createEquipo(newEquipo);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Equipo creado exitosamente');
            expect(result.data).toEqual(newEquipo);
            expect(mockEquipoRepository.create).toHaveBeenCalledWith(newEquipo);
        });

        it('should handle errors when creating an equipment', async () => {
            const newEquipo = new Equipo(1, 'SER002', 'REF002', 2000);

            mockEquipoRepository.create.mockRejectedValue(new Error('Database error'));

            const result = await equipoService.createEquipo(newEquipo);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al crear equipo');
            expect(result.data).toBeNull();
        });
    });

    describe('updateEquipo', () => {
        it('should update an existing equipment', async () => {
            const updatedEquipo = new Equipo(1, 'SER001', 'REF001', 1500);

            mockEquipoRepository.update.mockResolvedValue(true);

            const result = await equipoService.updateEquipo(1, updatedEquipo);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Equipo actualizado exitosamente');
            expect(result.data).toEqual(updatedEquipo);
            expect(mockEquipoRepository.update).toHaveBeenCalledWith(1, updatedEquipo);
        });

        it('should return not found when updating non-existent equipment', async () => {
            const updatedEquipo = new Equipo(1, 'SER001', 'REF001', 1500);

            mockEquipoRepository.update.mockResolvedValue(false);

            const result = await equipoService.updateEquipo(1, updatedEquipo);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Equipo no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('deleteEquipo', () => {
        it('should delete an existing equipment', async () => {
            mockEquipoRepository.delete.mockResolvedValue(true);

            const result = await equipoService.deleteEquipo(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Equipo eliminado exitosamente');
            expect(result.data).toBe(true);
            expect(mockEquipoRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should return not found when deleting non-existent equipment', async () => {
            mockEquipoRepository.delete.mockResolvedValue(false);

            const result = await equipoService.deleteEquipo(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Equipo no encontrado');
            expect(result.data).toBeNull();
        });
    });
}); 