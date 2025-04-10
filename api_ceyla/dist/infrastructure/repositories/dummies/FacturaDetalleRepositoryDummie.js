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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaDetalleRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class FacturaDetalleRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.facturaDetalles = [
            {
                id: 1,
                factura_id: 1,
                negocio_equipo_id: 1,
                valor: 238000
            },
            {
                id: 2,
                factura_id: 1,
                negocio_equipo_id: 2,
                valor: 214200
            },
            {
                id: 3,
                factura_id: 2,
                negocio_equipo_id: 1,
                valor: 238000
            },
            {
                id: 4,
                factura_id: 2,
                negocio_equipo_id: 2,
                valor: 214200
            },
            {
                id: 5,
                factura_id: 3,
                negocio_equipo_id: 3,
                valor: 952000
            },
            {
                id: 6,
                factura_id: 4,
                negocio_equipo_id: 3,
                valor: 952000
            },
            {
                id: 7,
                factura_id: 5,
                negocio_equipo_id: 4,
                valor: 357000
            },
            {
                id: 8,
                factura_id: 6,
                negocio_equipo_id: 5,
                valor: 261800
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturaDetalles;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalle = this.facturaDetalles.find(fd => fd.id === id);
            return detalle || null;
        });
    }
    // Métodos específicos para FacturaDetalle
    findByFacturaId(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
        });
    }
    findByNegocioEquipoId(negocioEquipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturaDetalles.filter(fd => fd.negocio_equipo_id === negocioEquipoId);
        });
    }
    getTotalValorPorFactura(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const detalles = this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
            return detalles.reduce((total, detalle) => total + detalle.valor, 0);
        });
    }
    getDetallesConInfoEquipo(facturaId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulamos info adicional para los detalles de la factura
            const detalles = this.facturaDetalles.filter(fd => fd.factura_id === facturaId);
            return detalles.map(detalle => {
                // Datos ficticios para simular info de equipo
                const equipoInfo = Object.assign(Object.assign({}, detalle), { valor_arrendamiento: detalle.valor / 1.19, tarifa_iva: 19, serial: `SN-00${detalle.negocio_equipo_id}`, referencia: `Equipo de prueba ${detalle.negocio_equipo_id}` });
                return equipoInfo;
            });
        });
    }
}
exports.FacturaDetalleRepositoryDummie = FacturaDetalleRepositoryDummie;
