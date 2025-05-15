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
exports.NegocioController = void 0;
class NegocioController {
    constructor(negocioService) {
        this.negocioService = negocioService;
    }
    getNegocios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.negocioService.getNegocios();
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    getNegocioById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.negocioService.getNegocioById(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    createNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const negocio = req.body;
                const result = yield this.negocioService.createNegocio(negocio);
                res.status(result.success ? 201 : 400).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    updateNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const negocio = req.body;
                const result = yield this.negocioService.updateNegocio(id, negocio);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    deleteNegocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.negocioService.deleteNegocio(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    createNegocioWithEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const result = yield this.negocioService.createNegocioWithEquipos(dto);
                if (result.success) {
                    res.status(201).json(result);
                }
                else {
                    res.status(400).json(result);
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor',
                    data: null
                });
            }
        });
    }
    generarFacturasMensuales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.negocioService.generarFacturasMensuales();
                if (result.success) {
                    res.status(200).json(result);
                }
                else {
                    res.status(400).json(result);
                }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor',
                    data: null
                });
            }
        });
    }
}
exports.NegocioController = NegocioController;
