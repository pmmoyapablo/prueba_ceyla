import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { Injector } from '../../injections/Injector';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { ClienteService } from '../../../application/services/ClienteService';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const clienteRepository = injector.resolve<IClienteRepository>('clienteRepository');
const clienteService = new ClienteService(clienteRepository);
const clienteController = new ClienteController(clienteService);

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', clienteController.getClientes.bind(clienteController));

/**
 * @swagger
 * /api/clientes/email/{email}:
 *   get:
 *     summary: Obtiene un cliente por su email
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/email/:email', clienteController.getClienteByEmail.bind(clienteController));

/**
 * @swagger
 * /api/clientes/numeroDocumento/{numeroDocumento}:
 *   get:
 *     summary: Obtiene un cliente por su número de documento
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: numeroDocumento
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de documento del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/numeroDocumento/:numeroDocumento', clienteController.getClienteByNumeroDocumento.bind(clienteController));

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', clienteController.getClienteById.bind(clienteController));

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', clienteController.createCliente.bind(clienteController));

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id', clienteController.updateCliente.bind(clienteController));

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', clienteController.deleteCliente.bind(clienteController));

export default router;
