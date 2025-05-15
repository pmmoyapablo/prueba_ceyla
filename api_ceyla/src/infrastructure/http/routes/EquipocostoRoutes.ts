import { Router } from 'express';
import { EquipoCostoController } from '../controllers/EquipoCostoController';
import { EquipoCostoService } from '../../../application/services/EquipoCostoService';
import { Injector } from '../../injections/Injector';
import { IEquipoCostoRepository } from '../../../domain/repositories/IEquipoCostoRepository';
import { IEquipoRepository } from '../../../domain/repositories/IEquipoRepository';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);

// Crear instancias de los repositorios
const equipoCostoRepository = injector.resolve<IEquipoCostoRepository>('equipoCostoRepository');
const equipoRepository = injector.resolve<IEquipoRepository>('equipoRepository');

// Crear instancia del servicio
const equipoCostoService = new EquipoCostoService(equipoCostoRepository, equipoRepository);

// Crear instancia del controlador
const equipoCostoController = new EquipoCostoController(equipoCostoService);

// Registrar un nuevo costo
router.post('/', equipoCostoController.registrarCosto.bind(equipoCostoController));

// Obtener costos por equipo
router.get('/equipo/:equipo_id', equipoCostoController.getCostosByEquipo.bind(equipoCostoController));

// Obtener costos por tipo (MANTENIMIENTO o ARREGLO)
router.get('/tipo/:tipo', equipoCostoController.getCostosByTipo.bind(equipoCostoController));

// Obtener costos por rango de fechas
router.get('/fecha', equipoCostoController.getCostosByFechaRange.bind(equipoCostoController));

export default router; 