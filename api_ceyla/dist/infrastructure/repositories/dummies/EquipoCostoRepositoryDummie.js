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
exports.EquipoCostoRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class EquipoCostoRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.equipoCostos = [
            {
                id: 1,
                equipo_id: 1,
                fecha: new Date('2023-01-10'),
                descripcion: 'Mantenimiento preventivo',
                valor: 150000
            },
            {
                id: 2,
                equipo_id: 1,
                fecha: new Date('2023-06-15'),
                descripcion: 'Actualización de software',
                valor: 80000
            },
            {
                id: 3,
                equipo_id: 2,
                fecha: new Date('2023-02-05'),
                descripcion: 'Cambio de batería',
                valor: 350000
            },
            {
                id: 4,
                equipo_id: 3,
                fecha: new Date('2023-03-20'),
                descripcion: 'Ampliación de memoria RAM',
                valor: 420000
            },
            {
                id: 5,
                equipo_id: 4,
                fecha: new Date('2023-01-25'),
                descripcion: 'Actualización de servidor',
                valor: 1500000
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipoCostos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const costo = this.equipoCostos.find(c => c.id === id);
            return costo || null;
        });
    }
    // Métodos específicos para EquipoCosto
    findByEquipoId(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipoCostos.filter(c => c.equipo_id === equipoId);
        });
    }
    findByDateRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equipoCostos.filter(c => c.fecha >= fechaInicio && c.fecha <= fechaFin);
        });
    }
    getTotalCostosPorEquipo(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const costos = this.equipoCostos.filter(c => c.equipo_id === equipoId);
            return costos.reduce((total, costo) => total + costo.valor, 0);
        });
    }
}
exports.EquipoCostoRepositoryDummie = EquipoCostoRepositoryDummie;
