import { ClienteRepository, EquipoRepository, FacturaRepository, NegocioRepository, FacturaDetalleRepository, EquipoCostoRepository, NegocioEquipoRepository } from "../repositories/mysql";
import { IClienteRepository } from "../../domain/repositories/IClienteRepository";
import { ClienteRepositoryDummie } from "../repositories/dummies/ClienteRepositoryDummie";
import { NegocioRepositoryDummie } from "../repositories/dummies/NegocioRepositoryDummie";
import { EquipoRepositoryDummie } from "../repositories/dummies/EquipoRepositoryDummie";
import { FacturaRepositoryDummie } from "../repositories/dummies/FacturaRepositoryDummie";
import { FacturaDetalleRepositoryDummie } from "../repositories/dummies/FacturaDetalleRepositoryDummie";
import { NegocioEquipoRepositoryDummie } from "../repositories/dummies/NegocioEquipoRepositoryDummie";
import { IEquipoRepository } from "../../domain/repositories/IEquipoRepository";
import { INegocioRepository } from "../../domain/repositories/INegocioRepository";
import { IFacturaRepository } from "../../domain/repositories/IFacturaRepository";
import { IEquipoCostoRepository } from "../../domain/repositories/IEquipoCostoRepository";
import { INegocioEquipoRepository } from "../../domain/repositories/INegocioEquipoRepository";
import { IFacturaDetalleRepository } from "../../domain/repositories/IFacturaDetalleRepository";
import { EquipoCostoRepositoryDummie } from "../repositories/dummies/EquipoCostoRepositoryDummie";


export class Injector {
    private static instance: Injector;
    private container: Map<string, any>;

    private constructor() {
        this.container = new Map();
    }

    public static getInstance(): Injector {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }

    public setAdapters(adapter: string): void {

        let clienteRepository: IClienteRepository | undefined;
        let negocioRepository: INegocioRepository | undefined;
        let equipoRepository: IEquipoRepository | undefined;
        let facturaRepository: IFacturaRepository | undefined;
        let facturaDetalleRepository: IFacturaDetalleRepository | undefined;
        let equipoCostoRepository: IEquipoCostoRepository | undefined;
        let negocioEquipoRepository: INegocioEquipoRepository | undefined;
        if (adapter === 'mysql') {
            clienteRepository = new ClienteRepository();
            negocioRepository = new NegocioRepository();
            equipoRepository = new EquipoRepository();
            facturaRepository = new FacturaRepository();
            facturaDetalleRepository = new FacturaDetalleRepository();
            equipoCostoRepository = new EquipoCostoRepository();
            negocioEquipoRepository = new NegocioEquipoRepository();
        }
        else if (adapter === 'dummies') {
            clienteRepository = new ClienteRepositoryDummie();
            negocioRepository = new NegocioRepositoryDummie();
            equipoRepository = new EquipoRepositoryDummie();
            facturaRepository = new FacturaRepositoryDummie(); 
            facturaDetalleRepository = new FacturaDetalleRepositoryDummie();
            equipoCostoRepository = new EquipoCostoRepositoryDummie();
            negocioEquipoRepository = new NegocioEquipoRepositoryDummie();
        }
        else {
            throw new Error('Adapter no válido');
        }

        this.register('clienteRepository', clienteRepository);
        this.register('negocioRepository', negocioRepository);
        this.register('equipoRepository', equipoRepository);
        this.register('facturaRepository', facturaRepository); 
        this.register('facturaDetalleRepository', facturaDetalleRepository);
        this.register('equipoCostoRepository', equipoCostoRepository);
        this.register('negocioEquipoRepository', negocioEquipoRepository);
    }

    private register(key: string, value: any): void {
        this.container.set(key, value);
    }
    
    public resolve<T>(key: string): T {
        return this.container.get(key);
    }
}