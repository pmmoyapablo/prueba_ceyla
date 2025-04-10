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
exports.EquipoService = void 0;
class EquipoService {
    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository;
    }
    getEquipos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipos = yield this.equipoRepository.findAll();
                return {
                    success: true,
                    message: 'Equipos encontrados',
                    data: equipos
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener equipos',
                    data: null
                };
            }
        });
    }
    getEquipoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = yield this.equipoRepository.findById(id);
                if (!equipo) {
                    return {
                        success: false,
                        message: 'Equipo no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Equipo encontrado',
                    data: equipo
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener equipo',
                    data: null
                };
            }
        });
    }
    createEquipo(equipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newEquipo = yield this.equipoRepository.create(equipo);
                return {
                    success: true,
                    message: 'Equipo creado exitosamente',
                    data: newEquipo
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al crear equipo',
                    data: null
                };
            }
        });
    }
    updateEquipo(id, equipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedEquipo = yield this.equipoRepository.update(id, equipo);
                if (!updatedEquipo) {
                    return {
                        success: false,
                        message: 'Equipo no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Equipo actualizado exitosamente',
                    data: updatedEquipo
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al actualizar equipo',
                    data: null
                };
            }
        });
    }
    deleteEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.equipoRepository.delete(id);
                if (!result) {
                    return {
                        success: false,
                        message: 'Equipo no encontrado',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Equipo eliminado exitosamente',
                    data: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al eliminar equipo',
                    data: null
                };
            }
        });
    }
}
exports.EquipoService = EquipoService;
