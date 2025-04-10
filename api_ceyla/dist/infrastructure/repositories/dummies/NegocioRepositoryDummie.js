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
exports.NegocioRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class NegocioRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.negocios = [
            {
                id: 1,
                cliente_id: 1,
                nombre: 'Proyecto de Desarrollo Web',
                fecha_inicio: new Date('2023-01-15'),
                fecha_fin: new Date('2023-12-31')
            },
            {
                id: 2,
                cliente_id: 1,
                nombre: 'Mantenimiento de Servidores',
                fecha_inicio: new Date('2023-02-01'),
                fecha_fin: new Date('2099-12-31') // Fecha lejana para simular activo
            },
            {
                id: 3,
                cliente_id: 2,
                nombre: 'Diseño de Identidad Corporativa',
                fecha_inicio: new Date('2023-03-10'),
                fecha_fin: new Date('2023-06-30')
            },
            {
                id: 4,
                cliente_id: 3,
                nombre: 'Implementación de CRM',
                fecha_inicio: new Date('2023-05-01'),
                fecha_fin: new Date('2099-12-31') // Fecha lejana para simular activo
            },
            {
                id: 5,
                cliente_id: 4,
                nombre: 'Desarrollo de Aplicación Móvil',
                fecha_inicio: new Date('2023-04-15'),
                fecha_fin: new Date('2023-10-15')
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.negocios;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const negocio = this.negocios.find(n => n.id === id);
            return negocio || null;
        });
    }
    // Métodos específicos para Negocio
    findByClienteId(clienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.negocios.filter(n => n.cliente_id === clienteId);
        });
    }
    findActiveNegocios() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            return this.negocios.filter(n => n.fecha_fin > today);
        });
    }
}
exports.NegocioRepositoryDummie = NegocioRepositoryDummie;
