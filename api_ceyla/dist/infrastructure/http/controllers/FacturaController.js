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
exports.FacturaController = void 0;
class FacturaController {
    constructor(facturaService) {
        this.facturaService = facturaService;
    }
    getFacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.facturaService.getFacturas();
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    getFacturaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.facturaService.getFacturaById(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    createFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factura = req.body;
                const result = yield this.facturaService.createFactura(factura);
                res.status(result.success ? 201 : 400).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    updateFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const factura = req.body;
                const result = yield this.facturaService.updateFactura(id, factura);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    deleteFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.facturaService.deleteFactura(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
}
exports.FacturaController = FacturaController;
