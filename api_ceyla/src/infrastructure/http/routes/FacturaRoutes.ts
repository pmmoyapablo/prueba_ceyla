import { Router } from 'express';
import { FacturaController } from '../controllers/FacturaController';
import { Injector } from '../../injections/Injector';
import { IFacturaRepository } from '../../../domain/repositories/IFacturaRepository';
import { FacturaService } from '../../../application/services/FacturaService';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const facturaRepository = injector.resolve<IFacturaRepository>('facturaRepository');
const facturaService = new FacturaService(facturaRepository);
const facturaController = new FacturaController(facturaService);

/**
 * @swagger
 * /api/facturas:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get('/', facturaController.getFacturas.bind(facturaController));

/**
 * @swagger
 * /api/facturas/{id}:
 *   get:
 *     summary: Obtiene una factura por su ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturaController.getFacturaById.bind(facturaController));

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', facturaController.createFactura.bind(facturaController));

/**
 * @swagger
 * /api/facturas/{id}:
 *   put:
 *     summary: Actualiza una factura existente
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
router.put('/:id', facturaController.updateFactura.bind(facturaController));

/**
 * @swagger
 * /api/facturas/{id}:
 *   delete:
 *     summary: Elimina una factura
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       204:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
router.delete('/:id', facturaController.deleteFactura.bind(facturaController));

export default router; 