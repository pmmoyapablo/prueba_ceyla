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
exports.RepositoryBase = void 0;
const database_1 = __importDefault(require("../../config/database"));
class RepositoryBase {
    constructor(tableName) {
        this.tableName = tableName;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query(`SELECT * FROM ${this.tableName}`);
                return rows;
            }
            catch (error) {
                console.error(`Error al obtener todos los registros de ${this.tableName}:`, error);
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield database_1.default.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
                if (rows.length === 0) {
                    return null;
                }
                return rows[0];
            }
            catch (error) {
                console.error(`Error al obtener el registro con id ${id} de ${this.tableName}:`, error);
                throw error;
            }
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Elimina el id si está presente y entity es un objeto (no se deben insertar IDs autoincrementales)
                const entityToInsert = Object.assign({}, entity);
                if ('id' in entityToInsert) {
                    delete entityToInsert.id;
                }
                const columns = Object.keys(entityToInsert).join(', ');
                const placeholders = Object.keys(entityToInsert).map(() => '?').join(', ');
                const values = Object.values(entityToInsert);
                const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
                const [result] = yield database_1.default.query(query, values);
                // Obtener la entidad recién creada con su ID
                const newEntity = Object.assign(Object.assign({}, entity), { id: result.insertId });
                return newEntity;
            }
            catch (error) {
                console.error(`Error al crear registro en ${this.tableName}:`, error);
                throw error;
            }
        });
    }
    update(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityToUpdate = Object.assign({}, entity);
                // Asegurarse de no actualizar el id
                if ('id' in entityToUpdate) {
                    delete entityToUpdate.id;
                }
                if (Object.keys(entityToUpdate).length === 0) {
                    return false; // No hay nada que actualizar
                }
                const setClause = Object.keys(entityToUpdate)
                    .map(key => `${key} = ?`)
                    .join(', ');
                const values = [...Object.values(entityToUpdate), id];
                const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
                const [result] = yield database_1.default.query(query, values);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.error(`Error al actualizar registro con id ${id} en ${this.tableName}:`, error);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
                const [result] = yield database_1.default.query(query, [id]);
                return result.affectedRows > 0;
            }
            catch (error) {
                console.error(`Error al eliminar registro con id ${id} de ${this.tableName}:`, error);
                throw error;
            }
        });
    }
}
exports.RepositoryBase = RepositoryBase;
