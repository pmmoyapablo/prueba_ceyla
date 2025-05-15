"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EquipoCostoController_1 = require("../controllers/EquipoCostoController");
const EquipoCostoService_1 = require("../../../application/services/EquipoCostoService");
const EquipoCostoRepositoryDummie_1 = require("../../repositories/dummies/EquipoCostoRepositoryDummie");
const EquipoRepositoryDummie_1 = require("../../repositories/dummies/EquipoRepositoryDummie");
const router = (0, express_1.Router)();
// Crear instancias de los repositorios
const equipoCostoRepository = new EquipoCostoRepositoryDummie_1.EquipoCostoRepositoryDummie();
const equipoRepository = new EquipoRepositoryDummie_1.EquipoRepositoryDummie();
// Crear instancia del servicio
const equipoCostoService = new EquipoCostoService_1.EquipoCostoService(equipoCostoRepository, equipoRepository);
// Crear instancia del controlador
const equipoCostoController = new EquipoCostoController_1.EquipoCostoController(equipoCostoService);
// Registrar un nuevo costo
router.post('/', equipoCostoController.registrarCosto.bind(equipoCostoController));
// Obtener costos por equipo
router.get('/equipo/:equipo_id', equipoCostoController.getCostosByEquipo.bind(equipoCostoController));
// Obtener costos por tipo (MANTENIMIENTO o ARREGLO)
router.get('/tipo/:tipo', equipoCostoController.getCostosByTipo.bind(equipoCostoController));
// Obtener costos por rango de fechas
router.get('/fecha', equipoCostoController.getCostosByFechaRange.bind(equipoCostoController));
exports.default = router;
