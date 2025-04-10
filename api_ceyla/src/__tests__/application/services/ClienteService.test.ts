import { ClienteService } from '../../../application/services/ClienteService';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';

describe('ClienteService', () => {
    let clienteService: ClienteService;
    let mockClienteRepository: jest.Mocked<IClienteRepository>;

    beforeEach(() => {
        mockClienteRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByEmail: jest.fn(),
            findByNumeroDocumento: jest.fn()
        };
        clienteService = new ClienteService(mockClienteRepository);
    });

    describe('getClientes', () => {
        it('should return all clients', async () => {
            const mockClientes: Cliente[] = [
                new Cliente(1, 12345678, 'Cliente 1', 'Apellido 1', 'cliente1@test.com', '1234567890')
            ];

            mockClienteRepository.findAll.mockResolvedValue(mockClientes);

            const result = await clienteService.getClientes();

            expect(result.success).toBe(true);
            expect(result.message).toBe('Clientes encontrados');
            expect(result.data).toEqual(mockClientes);
            expect(mockClienteRepository.findAll).toHaveBeenCalled();
        });

        it('should handle errors when getting clients', async () => {
            mockClienteRepository.findAll.mockRejectedValue(new Error('Database error'));

            const result = await clienteService.getClientes();

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al obtener clientes');
            expect(result.data).toBeNull();
        });
    });

    describe('getClienteById', () => {
        it('should return a client by id', async () => {
            const mockCliente = new Cliente(1, 12345678, 'Cliente 1', 'Apellido 1', 'cliente1@test.com', '1234567890');

            mockClienteRepository.findById.mockResolvedValue(mockCliente);

            const result = await clienteService.getClienteById(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Cliente encontrado');
            expect(result.data).toEqual(mockCliente);
            expect(mockClienteRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should return not found when client does not exist', async () => {
            mockClienteRepository.findById.mockResolvedValue(null);

            const result = await clienteService.getClienteById(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Cliente no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('createCliente', () => {
        it('should create a new client', async () => {
            const newCliente = new Cliente(1, 87654321, 'Nuevo Cliente', 'Nuevo Apellido', 'nuevo@test.com', '0987654321');

            mockClienteRepository.create.mockResolvedValue(newCliente);

            const result = await clienteService.createCliente(newCliente);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Cliente creado exitosamente');
            expect(result.data).toEqual(newCliente);
            expect(mockClienteRepository.create).toHaveBeenCalledWith(newCliente);
        });

        it('should handle errors when creating a client', async () => {
            const newCliente = new Cliente(1, 87654321, 'Nuevo Cliente', 'Nuevo Apellido', 'nuevo@test.com', '0987654321');

            mockClienteRepository.create.mockRejectedValue(new Error('Database error'));

            const result = await clienteService.createCliente(newCliente);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Error al crear cliente');
            expect(result.data).toBeNull();
        });
    });

    describe('updateCliente', () => {
        it('should update an existing client', async () => {
            const updatedCliente = new Cliente(1, 12345678, 'Cliente Actualizado', 'Apellido Actualizado', 'actualizado@test.com', '1234567890');

            mockClienteRepository.update.mockResolvedValue(true);

            const result = await clienteService.updateCliente(1, updatedCliente);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Cliente actualizado exitosamente');
            expect(result.data).toEqual(updatedCliente);
            expect(mockClienteRepository.update).toHaveBeenCalledWith(1, updatedCliente);
        });

        it('should return not found when updating non-existent client', async () => {
            const updatedCliente = new Cliente(1, 12345678, 'Cliente Actualizado', 'Apellido Actualizado', 'actualizado@test.com', '1234567890');

            mockClienteRepository.update.mockResolvedValue(false);

            const result = await clienteService.updateCliente(1, updatedCliente);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Cliente no encontrado');
            expect(result.data).toBeNull();
        });
    });

    describe('deleteCliente', () => {
        it('should delete an existing client', async () => {
            mockClienteRepository.delete.mockResolvedValue(true);

            const result = await clienteService.deleteCliente(1);

            expect(result.success).toBe(true);
            expect(result.message).toBe('Cliente eliminado exitosamente');
            expect(result.data).toBe(true);
            expect(mockClienteRepository.delete).toHaveBeenCalledWith(1);
        });

        it('should return not found when deleting non-existent client', async () => {
            mockClienteRepository.delete.mockResolvedValue(false);

            const result = await clienteService.deleteCliente(1);

            expect(result.success).toBe(false);
            expect(result.message).toBe('Cliente no encontrado');
            expect(result.data).toBeNull();
        });
    });
}); 