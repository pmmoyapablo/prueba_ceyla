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
exports.EquipoCostoService = void 0;
class EquipoCostoService {
    constructor(equipoCostoRepository, equipoRepository) {
        this.equipoCostoRepository = equipoCostoRepository;
        this.equipoRepository = equipoRepository;
    }
    registrarCosto(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar que el equipo existe
                const equipo = yield this.equipoRepository.findById(dto.equipo_id);
                if (!equipo) {
                    return {
                        success: false,
                        message: 'El equipo no existe',
                        data: null
                    };
                }
                // Crear el registro de costo
                const costo = yield this.equipoCostoRepository.create({
                    equipo_id: dto.equipo_id,
                    fecha: dto.fecha,
                    descripcion: dto.descripcion,
                    valor: dto.valor,
                    tipo: dto.tipo
                });
                return {
                    success: true,
                    message: 'Costo registrado exitosamente',
                    data: costo
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al registrar el costo',
                    data: null
                };
            }
        });
    }
    getCostosByEquipo(equipo_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costos = yield this.equipoCostoRepository.findByEquipoId(equipo_id);
                return {
                    success: true,
                    message: 'Costos encontrados',
                    data: costos
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener los costos',
                    data: null
                };
            }
        });
    }
    getCostosByTipo(tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costos = yield this.equipoCostoRepository.findAll();
                return {
                    success: true,
                    message: 'Costos encontrados',
                    data: costos.filter(c => c.tipo === tipo)
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener los costos',
                    data: null
                };
            }
        });
    }
    getCostosByFechaRange(fechaInicio, fechaFin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const costos = yield this.equipoCostoRepository.findByDateRange(fechaInicio, fechaFin);
                return {
                    success: true,
                    message: 'Costos encontrados',
                    data: costos
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener los costos',
                    data: null
                };
            }
        });
    }
}
exports.EquipoCostoService = EquipoCostoService;
