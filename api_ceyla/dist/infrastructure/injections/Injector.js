"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const mysql_1 = require("../repositories/mysql");
const ClienteRepositoryDummie_1 = require("../repositories/dummies/ClienteRepositoryDummie");
const NegocioRepositoryDummie_1 = require("../repositories/dummies/NegocioRepositoryDummie");
const EquipoRepositoryDummie_1 = require("../repositories/dummies/EquipoRepositoryDummie");
const FacturaRepositoryDummie_1 = require("../repositories/dummies/FacturaRepositoryDummie");
class Injector {
    constructor() {
        this.container = new Map();
    }
    static getInstance() {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }
    setAdapters(adapter) {
        let clienteRepository;
        let negocioRepository;
        let equipoRepository;
        let facturaRepository;
        if (adapter === 'mysql') {
            clienteRepository = new mysql_1.ClienteRepository();
            negocioRepository = new mysql_1.NegocioRepository();
            equipoRepository = new mysql_1.EquipoRepository();
            facturaRepository = new mysql_1.FacturaRepository();
        }
        else if (adapter === 'dummies') {
            clienteRepository = new ClienteRepositoryDummie_1.ClienteRepositoryDummie();
            negocioRepository = new NegocioRepositoryDummie_1.NegocioRepositoryDummie();
            equipoRepository = new EquipoRepositoryDummie_1.EquipoRepositoryDummie();
            facturaRepository = new FacturaRepositoryDummie_1.FacturaRepositoryDummie();
        }
        else {
            throw new Error('Adapter no válido');
        }
        this.register('clienteRepository', clienteRepository);
        this.register('negocioRepository', negocioRepository);
        this.register('equipoRepository', equipoRepository);
        this.register('facturaRepository', facturaRepository);
    }
    register(key, value) {
        this.container.set(key, value);
    }
    resolve(key) {
        return this.container.get(key);
    }
}
exports.Injector = Injector;
