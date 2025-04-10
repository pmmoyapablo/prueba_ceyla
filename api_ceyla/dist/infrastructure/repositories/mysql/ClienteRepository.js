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
exports.ClienteRepository = void 0;
const RepositoryBase_1 = require("./RepositoryBase");
const database_1 = __importDefault(require("../../config/database"));
class ClienteRepository extends RepositoryBase_1.RepositoryBase {
    constructor() {
        super('cliente');
    }
    // Métodos específicos para Cliente
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM cliente WHERE email = ?', [email]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.error('Error al buscar cliente por email:', error);
                throw error;
            }
        });
    }
    findByNumeroDocumento(numeroDocumento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query('SELECT * FROM cliente WHERE numero_documento = ?', [numeroDocumento]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.error('Error al buscar cliente por número de documento:', error);
                throw error;
            }
        });
    }
}
exports.ClienteRepository = ClienteRepository;
