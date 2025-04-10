import { Request, Response } from 'express';
import { ClienteService } from '../../../application/services/ClienteService';

export class ClienteController {
    private clienteService: ClienteService;

    constructor(clienteService: ClienteService) {
        this.clienteService = clienteService;
    }

    getClienteByEmail = async (req: Request, res: Response): Promise<void> => {
        const email = req.params.email;
        const result = await this.clienteService.getClienteByEmail(email);
        let code = 200;
        if (!result.success) { 
            code = 400; 
        } 

        res.status(code).json(result);
    }

    getClienteByNumeroDocumento = async (req: Request, res: Response): Promise<void> => {
        const numeroDocumento = Number(req.params.numeroDocumento);
        const result = await this.clienteService.getClienteByNumeroDocumento(numeroDocumento);
        let code = 200;
        if (!result.success) { 
            code = 400; 
        } 

        res.status(code).json(result);
    }

    getClienteById = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const result = await this.clienteService.getClienteById(id);
        let code = 200;
        if (!result.success) { 
            code = 400; 
        }  

        res.status(code).json(result);
    }

    getClientes = async (req: Request, res: Response): Promise<void> => {
        const result = await this.clienteService.getClientes();
        let code = 200;
        if (!result.success) { 
            code = 400; 
        }  

        res.status(code).json(result);
    }

    createCliente = async (req: Request, res: Response): Promise<void> => {
        const cliente = req.body;
        const result = await this.clienteService.createCliente(cliente);
        let code = 200;
        if (!result.success) { 
            code = 400; 
        }  

        res.status(code).json(result);
    }

    updateCliente = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const cliente = req.body;
        const result = await this.clienteService.updateCliente(id, cliente);
        let code = 200; 
        if (!result.success) { 
            code = 400; 
        }  

        res.status(code).json(result);
    }   

    deleteCliente = async (req: Request, res: Response): Promise<void> => {
        const id = Number(req.params.id);
        const result = await this.clienteService.deleteCliente(id);
        let code = 200;
        if (!result.success) { 
            code = 400; 
        }  

        res.status(code).json(result);
    }
}   
