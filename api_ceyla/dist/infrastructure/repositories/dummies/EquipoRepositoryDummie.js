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
        this.equipos = [
            {
                id: 1,
                serial: "EQ001",
                referencia: "Laptop HP",
                valor_compra: 2500000
            },
            {
                id: 2,
                serial: "EQ002",
                referencia: "Desktop Dell",
                valor_compra: 1800000
            },
            {
                id: 3,
                serial: "EQ003",
                referencia: "Monitor LG",
                valor_compra: 800000
            }
        ];
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipo = this.equipos.find(e => e.id === id);
            return equipo || null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipos;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEquipo = Object.assign({ id: this.equipos.length + 1 }, data);
            this.equipos.push(newEquipo);
            return newEquipo;
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
