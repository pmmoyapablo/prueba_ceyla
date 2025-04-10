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
exports.NegocioEquipoRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class NegocioEquipoRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('negocio_equipo');
    }
    // Métodos específicos para NegocioEquipo
    findByNegocioId(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM negocio_equipo WHERE negocio_id = ?', [negocioId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar relaciones por negocio_id:', error);
                throw error;
            }
        });
    }
    findByEquipoId(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM negocio_equipo WHERE equipo_id = ?', [equipoId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar relaciones por equipo_id:', error);
                throw error;
            }
        });
    }
    getEquiposConNegocioActivo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query(`SELECT ne.* FROM negocio_equipo ne
         JOIN negocio n ON ne.negocio_id = n.id
         WHERE n.fecha_fin IS NULL OR n.fecha_fin > CURDATE()`);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar equipos con negocio activo:', error);
                throw error;
            }
        });
    }
    getTotalValorArrendamientoPorNegocio(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const [result] = yield database_1.default.query('SELECT SUM(valor_arrendamiento) as total FROM negocio_equipo WHERE negocio_id = ?', [negocioId]);
                return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            }
            catch (error) {
                console.error('Error al calcular el total de arrendamiento por negocio:', error);
                throw error;
            }
        });
    }
}
exports.NegocioEquipoRepository = NegocioEquipoRepository;
