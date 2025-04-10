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

router.get('/', clienteController.getClientes.bind(clienteController));
router.get('/email/:email', clienteController.getClienteByEmail.bind(clienteController));
router.get('/numeroDocumento/:numeroDocumento', clienteController.getClienteByNumeroDocumento.bind(clienteController));
router.get('/:id', clienteController.getClienteById.bind(clienteController));
router.post('/', clienteController.createCliente.bind(clienteController));
router.put('/:id', clienteController.updateCliente.bind(clienteController));
router.delete('/:id', clienteController.deleteCliente.bind(clienteController));

export default router;
