"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NegocioController_1 = require("../controllers/NegocioController");
const NegocioService_1 = require("../../../application/services/NegocioService");
const Injector_1 = require("@/infrastructure/injections/Injector");
const router = (0, express_1.Router)();
const injector = Injector_1.Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
// Crear instancias de los repositorios
const negocioRepository = injector.resolve('negocioRepository');
const negocioEquipoRepository = injector.resolve('negocioEquipoRepository');
const facturaRepository = injector.resolve('facturaRepository');
const facturaDetalleRepository = injector.resolve('facturaDetalleRepository');
// Crear instancia del servicio con todos los argumentos requeridos
const negocioService = new NegocioService_1.NegocioService(negocioRepository, negocioEquipoRepository, facturaRepository, facturaDetalleRepository);
// Crear instancia del controlador
const negocioController = new NegocioController_1.NegocioController(negocioService);
/**
 * @swagger
 * /api/negocios:
 *   get:
 *     summary: Obtiene todos los negocios
 *     tags: [Negocios]
 *     responses:
 *       200:
 *         description: Lista de negocios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Negocio'
 */
router.get('/', negocioController.getNegocios.bind(negocioController));
/**
 * @swagger
 * /api/negocios/{id}:
 *   get:
 *     summary: Obtiene un negocio por su ID
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Negocio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Negocio'
 *       404:
 *         description: Negocio no encontrado
 */
router.get('/:id', negocioController.getNegocioById.bind(negocioController));
/**
 * @swagger
 * /api/negocios:
 *   post:
 *     summary: Crea un nuevo negocio
 *     tags: [Negocios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Negocio'
 *     responses:
 *       201:
 *         description: Negocio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Negocio'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', negocioController.createNegocio.bind(negocioController));
/**
 * @swagger
 * /api/negocios/{id}:
 *   put:
 *     summary: Actualiza un negocio existente
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Negocio'
 *     responses:
 *       200:
 *         description: Negocio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Negocio'
 *       404:
 *         description: Negocio no encontrado
 */
router.put('/:id', negocioController.updateNegocio.bind(negocioController));
/**
 * @swagger
 * /api/negocios/{id}:
 *   delete:
 *     summary: Elimina un negocio
 *     tags: [Negocios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       204:
 *         description: Negocio eliminado exitosamente
 *       404:
 *         description: Negocio no encontrado
 */
router.delete('/:id', negocioController.deleteNegocio.bind(negocioController));
router.post('/with-equipos', negocioController.createNegocioWithEquipos.bind(negocioController));
router.post('/generar-facturas', negocioController.generarFacturasMensuales.bind(negocioController));
exports.default = router;
