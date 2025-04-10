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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoCostoRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class EquipoCostoRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('equipo_costo');
    }
    // Métodos específicos para EquipoCosto
    findByEquipoId(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM equipo_costo WHERE equipo_id = ? ORDER BY fecha DESC', [equipoId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar costos por equipo_id:', error);
                throw error;
            }
        });
    }
    findByDateRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM equipo_costo WHERE fecha BETWEEN ? AND ? ORDER BY fecha DESC', [fechaInicio, fechaFin]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar costos por rango de fechas:', error);
                throw error;
            }
        });
    }
    getTotalCostosPorEquipo(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const [result] = yield database_1.default.query('SELECT SUM(valor) as total FROM equipo_costo WHERE equipo_id = ?', [equipoId]);
                return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            }
            catch (error) {
                console.error('Error al calcular el total de costos por equipo:', error);
                throw error;
            }
        });
    }
}
exports.EquipoCostoRepository = EquipoCostoRepository;
