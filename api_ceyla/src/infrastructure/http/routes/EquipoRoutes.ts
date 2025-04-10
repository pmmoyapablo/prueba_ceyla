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

router.get('/', equipoController.getEquipos.bind(equipoController));
router.get('/:id', equipoController.getEquipoById.bind(equipoController));
router.post('/', equipoController.createEquipo.bind(equipoController));
router.put('/:id', equipoController.updateEquipo.bind(equipoController));
router.delete('/:id', equipoController.deleteEquipo.bind(equipoController));

export default router; 