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

router.get('/', facturaController.getFacturas.bind(facturaController));
router.get('/:id', facturaController.getFacturaById.bind(facturaController));
router.post('/', facturaController.createFactura.bind(facturaController));
router.put('/:id', facturaController.updateFactura.bind(facturaController));
router.delete('/:id', facturaController.deleteFactura.bind(facturaController));

export default router; 