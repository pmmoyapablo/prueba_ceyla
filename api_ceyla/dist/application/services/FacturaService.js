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
exports.FacturaService = void 0;
class FacturaService {
    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }
    getFacturas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facturas = yield this.facturaRepository.findAll();
                return {
                    success: true,
                    message: 'Facturas encontradas',
                    data: facturas
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener facturas',
                    data: null
                };
            }
        });
    }
    getFacturaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factura = yield this.facturaRepository.findById(id);
                if (!factura) {
                    return {
                        success: false,
                        message: 'Factura no encontrada',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Factura encontrada',
                    data: factura
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al obtener factura',
                    data: null
                };
            }
        });
    }
    createFactura(factura) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFactura = yield this.facturaRepository.create(factura);
                return {
                    success: true,
                    message: 'Factura creada exitosamente',
                    data: newFactura
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al crear factura',
                    data: null
                };
            }
        });
    }
    updateFactura(id, factura) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedFactura = yield this.facturaRepository.update(id, factura);
                if (!updatedFactura) {
                    return {
                        success: false,
                        message: 'Factura no encontrada',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Factura actualizada exitosamente',
                    data: updatedFactura
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al actualizar factura',
                    data: null
                };
            }
        });
    }
    deleteFactura(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.facturaRepository.delete(id);
                if (!result) {
                    return {
                        success: false,
                        message: 'Factura no encontrada',
                        data: null
                    };
                }
                return {
                    success: true,
                    message: 'Factura eliminada exitosamente',
                    data: true
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: 'Error al eliminar factura',
                    data: null
                };
            }
        });
    }
}
exports.FacturaService = FacturaService;
