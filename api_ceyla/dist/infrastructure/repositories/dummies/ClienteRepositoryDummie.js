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
exports.ClienteRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class ClienteRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.clientes = [
            {
                id: 1,
                numero_documento: 123456789,
                nombre: 'Juan',
                apellido: 'Pérez',
                email: 'juan.perez@example.com',
                telefono: '3001234567'
            },
            {
                id: 2,
                numero_documento: 987654321,
                nombre: 'María',
                apellido: 'González',
                email: 'maria.gonzalez@example.com',
                telefono: '3109876543'
            },
            {
                id: 3,
                numero_documento: 555666777,
                nombre: 'Carlos',
                apellido: 'Rodríguez',
                email: 'carlos.rodriguez@example.com',
                telefono: '3205557777'
            },
            {
                id: 4,
                numero_documento: 111222333,
                nombre: 'Ana',
                apellido: 'Martínez',
                email: 'ana.martinez@example.com',
                telefono: '3151112222'
            },
            {
                id: 5,
                numero_documento: 444555666,
                nombre: 'Pedro',
                apellido: 'López',
                email: 'pedro.lopez@example.com',
                telefono: '3004445555'
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clientes;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = this.clientes.find(c => c.id === id);
            return cliente || null;
        });
    }
    // Métodos específicos para Cliente
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = this.clientes.find(c => c.email === email);
            return cliente || null;
        });
    }
    findByNumeroDocumento(numeroDocumento) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = this.clientes.find(c => c.numero_documento === numeroDocumento);
            return cliente || null;
        });
    }
}
exports.ClienteRepositoryDummie = ClienteRepositoryDummie;
