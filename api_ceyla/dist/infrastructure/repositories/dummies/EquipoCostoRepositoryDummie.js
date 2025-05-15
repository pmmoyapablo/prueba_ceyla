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
const sequelize_1 = require("sequelize");
class EquipoCostoRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        this.equiposCostos = [
            {
                id: 1,
                equipo_id: 1,
                fecha: new Date('2024-03-15'),
                descripcion: 'Cambio de teclado',
                valor: 150000,
                tipo: 'ARREGLO'
            },
            {
                id: 2,
                equipo_id: 1,
                fecha: new Date('2024-03-01'),
                descripcion: 'Limpieza general',
                valor: 80000,
                tipo: 'MANTENIMIENTO'
            },
            {
                id: 3,
                equipo_id: 2,
                fecha: new Date('2024-03-10'),
                descripcion: 'Cambio de disco duro',
                valor: 350000,
                tipo: 'ARREGLO'
            },
            {
                id: 4,
                equipo_id: 2,
                fecha: new Date('2024-03-05'),
                descripcion: 'Mantenimiento preventivo',
                valor: 420000,
                tipo: 'MANTENIMIENTO'
            },
            {
                id: 5,
                equipo_id: 3,
                fecha: new Date('2024-03-20'),
                descripcion: 'Cambio de pantalla',
                valor: 1500000,
                tipo: 'ARREGLO'
            }
        ];
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options === null || options === void 0 ? void 0 : options.where) {
                return this.equiposCostos.filter(costo => {
                    return Object.entries(options.where).every(([key, value]) => {
                        if (key === 'fecha' && value[sequelize_1.Op.between]) {
                            const [inicio, fin] = value[sequelize_1.Op.between];
                            return costo.fecha >= inicio && costo.fecha <= fin;
                        }
                        return costo[key] === value;
                    });
                });
            }
            return this.equiposCostos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const costo = this.equiposCostos.find(c => c.id === id);
            return costo || null;
        });
    }
    // Métodos específicos para EquipoCosto
    findByEquipoId(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equiposCostos.filter(c => c.equipo_id === equipoId);
        });
    }
    findByDateRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.equiposCostos.filter(c => c.fecha >= fechaInicio && c.fecha <= fechaFin);
        });
    }
    getTotalCostosPorEquipo(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const costos = this.equiposCostos.filter(c => c.equipo_id === equipoId);
            return costos.reduce((total, costo) => total + costo.valor, 0);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCosto = Object.assign({ id: this.equiposCostos.length + 1 }, data);
            this.equiposCostos.push(newCosto);
            return newCosto;
        });
    }
}
exports.EquipoCostoRepositoryDummie = EquipoCostoRepositoryDummie;
