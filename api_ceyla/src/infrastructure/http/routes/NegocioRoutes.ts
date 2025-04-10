import { Router } from 'express';
import { Injector } from '../../injections/Injector';
import { INegocioRepository } from '../../../domain/repositories/INegocioRepository';
import { NegocioService } from '../../../application/services/NegocioService';
import { NegocioController } from '../controllers/NegocioController';

const router = Router();
const injector = Injector.getInstance();
const adapter = process.env.ADAPTER || 'mysql';
injector.setAdapters(adapter);
const negocioRepository = injector.resolve<INegocioRepository>('negocioRepository');
const negocioService = new NegocioService(negocioRepository);
const negocioController = new NegocioController(negocioService);

router.get('/', negocioController.getNegocios.bind(negocioController));
router.get('/:id', negocioController.getNegocioById.bind(negocioController));
router.post('/', negocioController.createNegocio.bind(negocioController));
router.put('/:id', negocioController.updateNegocio.bind(negocioController));
router.delete('/:id', negocioController.deleteNegocio.bind(negocioController));

export default router; 