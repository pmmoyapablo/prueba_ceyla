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
exports.EquipoCostoController = void 0;
class EquipoCostoController {
    constructor(equipoCostoService) {
        this.equipoCostoService = equipoCostoService;
    }
    registrarCosto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const result = yield this.equipoCostoService.registrarCosto(dto);
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
    getCostosByEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo_id = parseInt(req.params.equipo_id);
                const result = yield this.equipoCostoService.getCostosByEquipo(equipo_id);
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
    getCostosByTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipo = req.params.tipo;
                const result = yield this.equipoCostoService.getCostosByTipo(tipo);
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
    getCostosByFechaRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fechaInicio, fechaFin } = req.query;
                const result = yield this.equipoCostoService.getCostosByFechaRange(new Date(fechaInicio), new Date(fechaFin));
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
exports.EquipoCostoController = EquipoCostoController;
