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
exports.FacturaDetalleRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class FacturaDetalleRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('factura_detalle');
    }
    // Métodos específicos para FacturaDetalle
    findByFacturaId(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM factura_detalle WHERE factura_id = ?', [facturaId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar detalles por factura_id:', error);
                throw error;
            }
        });
    }
    findByNegocioEquipoId(negocioEquipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM factura_detalle WHERE negocio_equipo_id = ?', [negocioEquipoId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar detalles por negocio_equipo_id:', error);
                throw error;
            }
        });
    }
    getTotalValorPorFactura(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const [result] = yield database_1.default.query('SELECT SUM(valor) as total FROM factura_detalle WHERE factura_id = ?', [facturaId]);
                return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            }
            catch (error) {
                console.error('Error al calcular el total de valor por factura:', error);
                throw error;
            }
        });
    }
    getDetallesConInfoEquipo(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query(`SELECT fd.*, ne.valor_arrendamiento, ne.tarifa_iva, e.serial, e.referencia
         FROM factura_detalle fd
         JOIN negocio_equipo ne ON fd.negocio_equipo_id = ne.id
         JOIN equipo e ON ne.equipo_id = e.id
         WHERE fd.factura_id = ?`, [facturaId]);
                return rows;
            }
            catch (error) {
                console.error('Error al obtener detalles con información de equipo:', error);
                throw error;
            }
        });
    }
}
exports.FacturaDetalleRepository = FacturaDetalleRepository;
