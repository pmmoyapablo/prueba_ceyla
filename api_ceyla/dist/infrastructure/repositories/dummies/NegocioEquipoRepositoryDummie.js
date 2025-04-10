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
exports.NegocioEquipoRepositoryDummie = void 0;
const RepositoryBaseDummie_1 = require("./RepositoryBaseDummie");
class NegocioEquipoRepositoryDummie extends RepositoryBaseDummie_1.RepositoryBaseDummie {
    constructor() {
        super();
        // Datos hardcodeados para pruebas
        this.negocioEquipos = [
            {
                id: 1,
                negocio_id: 1,
                equipo_id: 1,
                valor_arrendamiento: 200000,
                tarifa_iva: 19,
                valor_total: 238000
            },
            {
                id: 2,
                negocio_id: 1,
                equipo_id: 2,
                valor_arrendamiento: 180000,
                tarifa_iva: 19,
                valor_total: 214200
            },
            {
                id: 3,
                negocio_id: 2,
                equipo_id: 4,
                valor_arrendamiento: 800000,
                tarifa_iva: 19,
                valor_total: 952000
            },
            {
                id: 4,
                negocio_id: 3,
                equipo_id: 3,
                valor_arrendamiento: 300000,
                tarifa_iva: 19,
                valor_total: 357000
            },
            {
                id: 5,
                negocio_id: 4,
                equipo_id: 2,
                valor_arrendamiento: 220000,
                tarifa_iva: 19,
                valor_total: 261800
            }
        ];
    }
    // Sobrescribir métodos de la clase base para usar datos hardcodeados
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.negocioEquipos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const negocioEquipo = this.negocioEquipos.find(ne => ne.id === id);
            return negocioEquipo || null;
        });
    }
    // Métodos específicos para NegocioEquipo
    findByNegocioId(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.negocioEquipos.filter(ne => ne.negocio_id === negocioId);
        });
    }
    findByEquipoId(equipoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.negocioEquipos.filter(ne => ne.equipo_id === equipoId);
        });
    }
    getEquiposConNegocioActivo() {
        return __awaiter(this, void 0, void 0, function* () {
            // Para simplificar, consideramos los primeros 3 como activos (negocios 1 y 2)
            return this.negocioEquipos.slice(0, 3);
        });
    }
    getTotalValorArrendamientoPorNegocio(negocioId) {
        return __awaiter(this, void 0, void 0, function* () {
            const equipos = this.negocioEquipos.filter(ne => ne.negocio_id === negocioId);
            return equipos.reduce((total, equipo) => total + equipo.valor_arrendamiento, 0);
        });
    }
}
exports.NegocioEquipoRepositoryDummie = NegocioEquipoRepositoryDummie;
