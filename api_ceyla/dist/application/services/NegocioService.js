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
exports.NegocioService = void 0;
class NegocioService {
    constructor(negocioRepository, negocioEquipoRepository, facturaRepository, facturaDetalleRepository) {
        this.negocioRepository = negocioRepository;
        this.negocioEquipoRepository = negocioEquipoRepository;
        this.facturaRepository = facturaRepository;
        this.facturaDetalleRepository = facturaDetalleRepository;
    }
    getNegocios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const negocios = yield this.negocioRepository.findAll();
                return {
                    success: true,
                    message: 'Negocios encontrados',
                    data: negocios
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener negocios',
                    data: null
                };
            }
        });
    }
    getNegocioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const negocio = yield this.negocioRepository.findById(id);
                if (!negocio) {
                    return {
                        success: false,
                        message: 'Negocio no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Negocio encontrado',
                    data: negocio
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener negocio',
                    data: null
                };
            }
        });
    }
    createNegocio(negocio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNegocio = yield this.negocioRepository.create(negocio);
                return {
                    success: true,
                    message: 'Negocio creado exitosamente',
                    data: newNegocio
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al crear negocio',
                    data: null
                };
            }
        });
    }
    updateNegocio(id, negocio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNegocio = yield this.negocioRepository.update(id, negocio);
                if (!updatedNegocio) {
                    return {
                        success: false,
                        message: 'Negocio no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Negocio actualizado exitosamente',
                    data: updatedNegocio
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al actualizar negocio',
                    data: null
                };
            }
        });
    }
    deleteNegocio(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.negocioRepository.delete(id);
                if (!result) {
                    return {
                        success: false,
                        message: 'Negocio no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Negocio eliminado exitosamente',
                    data: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al eliminar negocio',
                    data: null
                };
            }
        });
    }
    createNegocioWithEquipos(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Crear el negocio
                const negocioData = {
                    id: 0, // El repositorio asignará el ID real
                    cliente_id: dto.cliente_id,
                    nombre: dto.nombre,
                    fecha_inicio: dto.fecha_inicio,
                    fecha_fin: dto.fecha_fin
                };
                const negocio = yield this.negocioRepository.create(negocioData);
                // Crear los equipos asociados al negocio
                for (const equipo of dto.equipos) {
                    const valor_total = equipo.valor_arrendamiento * (1 + equipo.tarifa_iva);
                    yield this.negocioEquipoRepository.create({
                        id: 0, // El repositorio asignará el ID real
                        negocio_id: negocio.id,
                        equipo_id: equipo.equipo_id,
                        valor_arrendamiento: equipo.valor_arrendamiento,
                        tarifa_iva: equipo.tarifa_iva,
                        valor_total: valor_total
                    });
                }
                return { success: true, message: 'Negocio creado exitosamente', data: negocio };
            }
            catch (error) {
                return { success: false, message: 'Error al crear el negocio', data: null };
            }
        });
    }
    generarFacturasMensuales() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fechaActual = new Date();
                const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
                // Obtener todos los negocios activos
                const negocios = yield this.negocioRepository.findAll();
                const negociosActivos = negocios.filter((negocio) => negocio.fecha_fin >= fechaActual);
                const facturasGeneradas = [];
                for (const negocio of negociosActivos) {
                    // Obtener los equipos del negocio
                    const equiposNegocio = yield this.negocioEquipoRepository.findAll();
                    const equiposDelNegocio = equiposNegocio.filter((eq) => eq.negocio_id === negocio.id);
                    // Calcular el valor total de la factura
                    let subtotal = 0;
                    let iva = 0;
                    for (const equipo of equiposDelNegocio) {
                        // Calcular días prorrateados si es necesario
                        const diasEnMes = ultimoDiaMesAnterior.getDate();
                        const diasProrrateados = negocio.fecha_inicio.getDate() === 1 ?
                            diasEnMes :
                            diasEnMes - negocio.fecha_inicio.getDate() + 1;
                        const valorDiario = equipo.valor_arrendamiento / diasEnMes;
                        const valorProrrateado = valorDiario * diasProrrateados;
                        subtotal += valorProrrateado;
                        iva += valorProrrateado * equipo.tarifa_iva;
                    }
                    const total = subtotal + iva;
                    // Crear la factura
                    const factura = yield this.facturaRepository.create({
                        id: 0, // El repositorio asignará el ID real
                        fecha_factura: ultimoDiaMesAnterior,
                        subtotal,
                        iva,
                        total,
                        cliente_id: negocio.cliente_id
                    });
                    // Crear los detalles de la factura
                    for (const equipo of equiposDelNegocio) {
                        yield this.facturaDetalleRepository.create({
                            id: 0, // El repositorio asignará el ID real
                            factura_id: factura.id,
                            equipo_id: equipo.equipo_id,
                            valor_arrendamiento: equipo.valor_arrendamiento,
                            tarifa_iva: equipo.tarifa_iva,
                            valor_total: equipo.valor_total
                        });
                    }
                    facturasGeneradas.push(factura);
                }
                return { success: true, message: 'Facturas generadas exitosamente', data: facturasGeneradas };
            }
            catch (error) {
                return { success: false, message: 'Error al generar facturas', data: null };
            }
        });
    }
}
exports.NegocioService = NegocioService;
