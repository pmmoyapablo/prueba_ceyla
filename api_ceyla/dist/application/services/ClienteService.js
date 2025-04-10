"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const entities_1 = require("../../domain/entities");
const zod_1 = require("zod");
const createClienteSchema = zod_1.z.object({
    numero_documento: zod_1.z.number().min(6).max(20),
    nombre: zod_1.z.string().min(2).max(45),
    apellido: zod_1.z.string().min(2).max(45),
    email: zod_1.z.string().min(3).max(100),
    telefono: zod_1.z.string().min(7).max(10)
});
class ClienteService {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    getClienteByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: true,
                message: '',
                data: undefined
            };
            try {
                const cliente = yield this.clienteRepository.findByEmail(email);
                result.message = 'Cliente obtenido correctamente';
                result.data = cliente;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al obtener el cliente';
                result.data = error;
            }
            return result;
        });
    }
    getClienteByNumeroDocumento(numeroDocumento) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: true,
                message: '',
                data: undefined
            };
            try {
                const cliente = yield this.clienteRepository.findByNumeroDocumento(numeroDocumento);
                result.message = 'Cliente obtenido correctamente';
                result.data = cliente;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al obtener el cliente';
                result.data = error;
            }
            return result;
        });
    }
    getClienteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: true,
                message: '',
                data: undefined
            };
            try {
                const cliente = yield this.clienteRepository.findById(id);
                result.message = 'Cliente obtenido correctamente';
                result.data = cliente;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al obtener el cliente';
                result.data = error;
            }
            return result;
        });
    }
    getClientes() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: true,
                message: '',
                data: undefined
            };
            try {
                const clientes = yield this.clienteRepository.findAll();
                result.message = 'Clientes obtenidos correctamente';
                result.data = clientes;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al obtener el cliente';
                result.data = error;
            }
            return result;
        });
    }
    createCliente(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
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
                const cliente = new entities_1.Cliente(0, dto.numero_documento, dto.nombre, dto.apellido, dto.email, dto.telefono);
                const clienteCreado = yield this.clienteRepository.create(cliente);
                result.message = 'Cliente creado correctamente';
                result.data = clienteCreado;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al crear el cliente';
                result.data = error;
            }
            return result;
        });
    }
    updateCliente(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
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
                const cliente = new entities_1.Cliente(id, dto.numero_documento, dto.nombre, dto.apellido, dto.email, dto.telefono);
                const clienteActualizado = yield this.clienteRepository.update(id, cliente);
                result.message = 'Cliente actualizado correctamente';
                result.data = clienteActualizado;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al actualizar el cliente';
                result.data = error;
            }
            return result;
        });
    }
    deleteCliente(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {
                success: true,
                message: '',
                data: undefined
            };
            try {
                const clienteEliminado = yield this.clienteRepository.delete(id);
                result.message = 'Cliente eliminado correctamente';
                result.data = clienteEliminado;
            }
            catch (error) {
                result.success = false;
                result.message = 'Error al eliminar el cliente';
                result.data = error;
            }
            return result;
        });
    }
}
exports.ClienteService = ClienteService;
