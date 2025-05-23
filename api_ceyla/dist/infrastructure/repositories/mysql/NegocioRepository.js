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
exports.NegocioRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class NegocioRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('negocio');
    }
    // Métodos específicos para Negocio
    findByClienteId(clienteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM negocio WHERE cliente_id = ?', [clienteId]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar negocios por cliente_id:', error);
                throw error;
            }
        });
    }
    findActiveNegocios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM negocio WHERE fecha_fin IS NULL OR fecha_fin > CURDATE()');
                return rows;
            }
            catch (error) {
                console.error('Error al buscar negocios activos:', error);
                throw error;
            }
        });
    }
}
exports.NegocioRepository = NegocioRepository;
