import { Router } from 'express';
import { Injector } from '../../injections/Injector';
import { IEquipoRepository } from '../../../domain/repositories/IEquipoRepository';
import { EquipoService } from '../../../application/services/EquipoService';
import { EquipoController } from '../controllers/EquipoController';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const equipoRepository = injector.resolve<IEquipoRepository>('equipoRepository');
const equipoService = new EquipoService(equipoRepository);
const equipoController = new EquipoController(equipoService);

/**
 * @swagger
 * /api/equipos:
 *   get:
 *     summary: Obtiene todos los equipos
 *     tags: [Equipos]
 *     responses:
 *       200:
 *         description: Lista de equipos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipo'
 */
router.get('/', equipoController.getEquipos.bind(equipoController));

/**
 * @swagger
 * /api/equipos/{id}:
 *   get:
 *     summary: Obtiene un equipo por su ID
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del equipo
 *     responses:
 *       200:
 *         description: Equipo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       404:
 *         description: Equipo no encontrado
 */
router.get('/:id', equipoController.getEquipoById.bind(equipoController));

/**
 * @swagger
 * /api/equipos:
 *   post:
 *     summary: Crea un nuevo equipo
 *     tags: [Equipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipo'
 *     responses:
 *       201:
 *         description: Equipo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', equipoController.createEquipo.bind(equipoController));

/**
 * @swagger
 * /api/equipos/{id}:
 *   put:
 *     summary: Actualiza un equipo existente
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del equipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipo'
 *     responses:
 *       200:
 *         description: Equipo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipo'
 *       404:
 *         description: Equipo no encontrado
 */
router.put('/:id', equipoController.updateEquipo.bind(equipoController));

/**
 * @swagger
 * /api/equipos/{id}:
 *   delete:
 *     summary: Elimina un equipo
 *     tags: [Equipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del equipo
 *     responses:
 *       204:
 *         description: Equipo eliminado exitosamente
 *       404:
 *         description: Equipo no encontrado
 */
router.delete('/:id', equipoController.deleteEquipo.bind(equipoController));

export default router; 