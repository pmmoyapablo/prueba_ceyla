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
exports.EquipoRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class EquipoRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.equipos = [
            {
                id: 1,
                serial: 'SN-001-2023',
                referencia: 'Laptop Dell XPS 13',
                valor_compra: 4500000
            },
            {
                id: 2,
                serial: 'SN-002-2023',
                referencia: 'Laptop HP Spectre x360',
                valor_compra: 3800000
            },
            {
                id: 3,
                serial: 'SN-003-2023',
                referencia: 'MacBook Pro M1',
                valor_compra: 5200000
            },
            {
                id: 4,
                serial: 'SN-004-2023',
                referencia: 'Servidor Dell PowerEdge',
                valor_compra: 12000000
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = this.equipos.find(e => e.id === id);
            return equipo || null;
        });
    }
    // Métodos específicos para Equipo
    findBySerial(serial) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = this.equipos.find(e => e.serial === serial);
            return equipo || null;
        });
    }
    findByReferencia(referencia) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipos.filter(e => e.referencia.includes(referencia));
        });
    }
    findDisponibles() {
        return __awaiter(this, void 0, void 0, function* () {
            // Para pruebas, retornar sólo los dos primeros equipos como "disponibles"
            return this.equipos.slice(0, 2);
        });
    }
}
exports.EquipoRepositoryDummie = EquipoRepositoryDummie;
