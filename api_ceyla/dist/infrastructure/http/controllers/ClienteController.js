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
exports.ClienteController = void 0;
class ClienteController {
    constructor(clienteService) {
        this.getClienteByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.params.email;
            const result = yield this.clienteService.getClienteByEmail(email);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.getClienteByNumeroDocumento = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const numeroDocumento = Number(req.params.numeroDocumento);
            const result = yield this.clienteService.getClienteByNumeroDocumento(numeroDocumento);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.getClienteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const result = yield this.clienteService.getClienteById(id);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.getClientes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.clienteService.getClientes();
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.createCliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cliente = req.body;
            const result = yield this.clienteService.createCliente(cliente);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.updateCliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const cliente = req.body;
            const result = yield this.clienteService.updateCliente(id, cliente);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.deleteCliente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const result = yield this.clienteService.deleteCliente(id);
            let code = 200;
            if (!result.success) {
                code = 400;
            }
            res.status(code).json(result);
        });
        this.clienteService = clienteService;
    }
}
exports.ClienteController = ClienteController;
