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
exports.EquipoController = void 0;
class EquipoController {
    constructor(equipoService) {
        this.equipoService = equipoService;
    }
    getEquipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.equipoService.getEquipos();
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    getEquipoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.equipoService.getEquipoById(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    createEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const equipo = req.body;
                const result = yield this.equipoService.createEquipo(equipo);
                res.status(result.success ? 201 : 400).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    updateEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const equipo = req.body;
                const result = yield this.equipoService.updateEquipo(id, equipo);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
    deleteEquipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield this.equipoService.deleteEquipo(id);
                res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: 'Error interno del servidor', data: null, error });
            }
        });
    }
}
exports.EquipoController = EquipoController;
