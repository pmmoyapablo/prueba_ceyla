"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
class Factura {
    constructor(id, negocio_id, fecha_factura, valor_factura) {
        this.id = id;
        this.negocio_id = negocio_id;
        this.fecha_factura = fecha_factura;
        this.valor_factura = valor_factura;
    }
}
exports.Factura = Factura;
