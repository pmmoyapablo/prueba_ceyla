"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaDetalle = void 0;
class FacturaDetalle {
    constructor(id, factura_id, negocio_equipo_id, valor) {
        this.id = id;
        this.factura_id = factura_id;
        this.negocio_equipo_id = negocio_equipo_id;
        this.valor = valor;
    }
}
exports.FacturaDetalle = FacturaDetalle;
