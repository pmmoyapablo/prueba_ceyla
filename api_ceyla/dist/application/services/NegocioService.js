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
    constructor(negocioRepository) {
        this.negocioRepository = negocioRepository;
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
}
exports.NegocioService = NegocioService;
