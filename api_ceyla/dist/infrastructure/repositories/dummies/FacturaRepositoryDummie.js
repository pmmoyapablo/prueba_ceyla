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
exports.FacturaRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class FacturaRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.facturas = [
            {
                id: 1,
                negocio_id: 1,
                fecha_factura: new Date('2023-02-01'),
                valor_factura: 476000
            },
            {
                id: 2,
                negocio_id: 1,
                fecha_factura: new Date('2023-03-01'),
                valor_factura: 476000
            },
            {
                id: 3,
                negocio_id: 2,
                fecha_factura: new Date('2023-03-01'),
                valor_factura: 952000
            },
            {
                id: 4,
                negocio_id: 2,
                fecha_factura: new Date('2023-04-01'),
                valor_factura: 952000
            },
            {
                id: 5,
                negocio_id: 3,
                fecha_factura: new Date('2023-04-01'),
                valor_factura: 535500
            },
            {
                id: 6,
                negocio_id: 4,
                fecha_factura: new Date('2023-06-01'),
                valor_factura: 440300
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturas;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const factura = this.facturas.find(f => f.id === id);
            return factura || null;
        });
    }
    // Métodos específicos para Factura
    findByNegocioId(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturas.filter(f => f.negocio_id === negocioId);
        });
    }
    findByDateRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.facturas.filter(f => f.fecha_factura >= fechaInicio && f.fecha_factura <= fechaFin);
        });
    }
    getTotalFacturadoPorNegocio(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const facturas = this.facturas.filter(f => f.negocio_id === negocioId);
            return facturas.reduce((total, factura) => total + factura.valor_factura, 0);
        });
    }
}
exports.FacturaRepositoryDummie = FacturaRepositoryDummie;
