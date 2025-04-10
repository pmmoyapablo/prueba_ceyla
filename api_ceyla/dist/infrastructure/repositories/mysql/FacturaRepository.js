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
exports.FacturaRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class FacturaRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('factura');
    }
    // Métodos específicos para Factura
    findByNegocioId(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM factura WHERE negocio_id = ? ORDER BY fecha_factura DESC', [negocioId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar facturas por negocio_id:', error);
                throw error;
            }
        });
    }
    findByDateRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM factura WHERE fecha_factura BETWEEN ? AND ? ORDER BY fecha_factura DESC', [fechaInicio, fechaFin]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar facturas por rango de fechas:', error);
                throw error;
            }
        });
    }
    getTotalFacturadoPorNegocio(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const [result] = yield database_1.default.query('SELECT SUM(valor_factura) as total FROM factura WHERE negocio_id = ?', [negocioId]);
                return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
            }
            catch (error) {
                console.error('Error al calcular el total facturado por negocio:', error);
                throw error;
            }
        });
    }
}
exports.FacturaRepository = FacturaRepository;
