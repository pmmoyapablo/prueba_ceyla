"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NegocioController_1 = require("../controllers/NegocioController");
const NegocioService_1 = require("../../../application/services/NegocioService");
const NegocioRepositoryDummie_1 = require("../../repositories/dummies/NegocioRepositoryDummie");
const NegocioEquipoRepositoryDummie_1 = require("../../repositories/dummies/NegocioEquipoRepositoryDummie");
const FacturaRepositoryDummie_1 = require("../../repositories/dummies/FacturaRepositoryDummie");
const FacturaDetalleRepositoryDummie_1 = require("../../repositories/dummies/FacturaDetalleRepositoryDummie");
const router = (0, express_1.Router)();
// Crear instancias de los repositorios
const negocioRepository = new NegocioRepositoryDummie_1.NegocioRepositoryDummie();
const negocioEquipoRepository = new NegocioEquipoRepositoryDummie_1.NegocioEquipoRepositoryDummie();
const facturaRepository = new FacturaRepositoryDummie_1.FacturaRepositoryDummie();
const facturaDetalleRepository = new FacturaDetalleRepositoryDummie_1.FacturaDetalleRepositoryDummie();
// Crear instancia del servicio
const negocioService = new NegocioService_1.NegocioService(negocioRepository, negocioEquipoRepository, facturaRepository, facturaDetalleRepository);
// Crear instancia del controlador
const negocioController = new NegocioController_1.NegocioController(negocioService);
// Rutas existentes
router.get('/', negocioController.getNegocios.bind(negocioController));
router.get('/:id', negocioController.getNegocioById.bind(negocioController));
router.post('/', negocioController.createNegocio.bind(negocioController));
router.put('/:id', negocioController.updateNegocio.bind(negocioController));
router.delete('/:id', negocioController.deleteNegocio.bind(negocioController));
// Nuevas rutas
router.post('/with-equipos', negocioController.createNegocioWithEquipos.bind(negocioController));
router.post('/generar-facturas', negocioController.generarFacturasMensuales.bind(negocioController));
exports.default = router;
