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
exports.EquipoRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class EquipoRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('equipo');
    }
    // Métodos específicos para Equipo
    findBySerial(serial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM equipo WHERE serial = ?', [serial]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.error('Error al buscar equipo por serial:', error);
                throw error;
            }
        });
    }
    findByReferencia(referencia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM equipo WHERE referencia LIKE ?', [`%${referencia}%`]);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar equipos por referencia:', error);
                throw error;
            }
        });
    }
    findDisponibles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query(`SELECT e.* FROM equipo e
         LEFT JOIN negocio_equipo ne ON e.id = ne.equipo_id
         WHERE ne.id IS NULL OR ne.equipo_id NOT IN (
           SELECT equipo_id FROM negocio_equipo
           JOIN negocio n ON negocio_equipo.negocio_id = n.id
           WHERE n.fecha_fin IS NULL OR n.fecha_fin > CURDATE()
         )`);
                return rows;
            }
            catch (error) {
                console.error('Error al buscar equipos disponibles:', error);
                throw error;
            }
        });
    }
}
exports.EquipoRepository = EquipoRepository;
