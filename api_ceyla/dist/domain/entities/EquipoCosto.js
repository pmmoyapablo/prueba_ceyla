"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoCosto = void 0;
class EquipoCosto {
    constructor(id, equipo_id, fecha, descripcion, valor, tipo) {
        this.id = id;
        this.equipo_id = equipo_id;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.valor = valor;
        this.tipo = tipo;
    }
}
exports.EquipoCosto = EquipoCosto;
