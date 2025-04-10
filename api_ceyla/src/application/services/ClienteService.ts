import { Cliente } from "../../domain/entities";
import { IClienteRepository } from "../../domain/repositories/IClienteRepository";
import { IClienteDto } from "../dtos/ClienteDto";
import { IResponse } from "../Response";
import { z } from 'zod';

const createClienteSchema = z.object({
    numero_documento: z.number().min(6).max(20),
    nombre: z.string().min(2).max(45),
    apellido: z.string().min(2).max(45),
    email: z.string().min(3).max(100),
    telefono: z.string().min(7).max(10)
  });

export class ClienteService {
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async getClienteByEmail(email: string): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };

        try {
            const cliente = await this.clienteRepository.findByEmail(email);
            result.message = 'Cliente obtenido correctamente';
            result.data = cliente;
        } catch (error) {
            result.success = false;
            result.message = 'Error al obtener el cliente';
            result.data = error;      
        }
        return result;
    }

    async getClienteByNumeroDocumento(numeroDocumento: number): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };

        try {
            const cliente = await this.clienteRepository.findByNumeroDocumento(numeroDocumento);
            result.message = 'Cliente obtenido correctamente';
            result.data = cliente;
        } catch (error) {
            result.success = false;
            result.message = 'Error al obtener el cliente';
            result.data = error;      
        }
        return result;
    }

    async getClienteById(id: number): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };

        try {
            const cliente = await this.clienteRepository.findById(id);         
            result.message = 'Cliente obtenido correctamente';
            result.data = cliente;      
        } catch (error) {
            result.success = false;
            result.message = 'Error al obtener el cliente';
            result.data = error;      
        }
        return result;
    }

    async getClientes(): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };

        try {
            const clientes = await this.clienteRepository.findAll();
            result.message = 'Clientes obtenidos correctamente';
            result.data = clientes;
        } catch (error) {
            result.success = false;
            result.message = 'Error al obtener el cliente';
            result.data = error;      
        }
        return result;
    } 

    async createCliente(dto: IClienteDto): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };
        
        try {
            const validation = createClienteSchema.safeParse(dto);

            if (!validation.success) {
                result.success = false;
                result.message = 'Datos inválidos';
                result.data = validation.error;
                return result;
            }
            const cliente = new Cliente(0, dto.numero_documento, dto.nombre, dto.apellido, dto.email, dto.telefono);
            const clienteCreado = await this.clienteRepository.create(cliente);
            result.message = 'Cliente creado correctamente';
            result.data = clienteCreado;
        } catch (error) {
            result.success = false;
            result.message = 'Error al crear el cliente';
            result.data = error;      
        }
        return result;
    }

    async updateCliente(id: number, dto: IClienteDto): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };
        
        try {
            const validation = createClienteSchema.safeParse(dto);

            if (!validation.success) {
                result.success = false;
                result.message = 'Datos inválidos';
                result.data = validation.error;
                return result;
            }
            const cliente = new Cliente(id, dto.numero_documento, dto.nombre, dto.apellido, dto.email, dto.telefono);
            const clienteActualizado = await this.clienteRepository.update(id, cliente);
            result.message = 'Cliente actualizado correctamente';
            result.data = clienteActualizado;
        } catch (error) {
            result.success = false;
            result.message = 'Error al actualizar el cliente';
            result.data = error;      
        }
        return result;
    }

    async deleteCliente(id: number): Promise<IResponse> {
        const result: IResponse = {
            success: true,
            message: '',
            data: undefined
        };
        
        try {
            const clienteEliminado = await this.clienteRepository.delete(id);
            result.message = 'Cliente eliminado correctamente';
            result.data = clienteEliminado;
        } catch (error) {
            result.success = false;
            result.message = 'Error al eliminar el cliente';
            result.data = error;      
        }
        return result;
    }
}