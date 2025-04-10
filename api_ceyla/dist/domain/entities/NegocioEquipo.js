"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegocioEquipo = void 0;
class NegocioEquipo {
    constructor(id, negocio_id, equipo_id, valor_arrendamiento, tarifa_iva, valor_total) {
        this.id = id;
        this.negocio_id = negocio_id;
        this.equipo_id = equipo_id;
        this.valor_arrendamiento = valor_arrendamiento;
        this.tarifa_iva = tarifa_iva;
        this.valor_total = valor_total;
    }
}
exports.NegocioEquipo = NegocioEquipo;
