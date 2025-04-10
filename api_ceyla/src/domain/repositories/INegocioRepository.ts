import { Negocio } from "../entities";
import { IRepository } from "./IRepository";

export interface INegocioRepository extends IRepository<Negocio> {
    findByClienteId(clienteId: number): Promise<Negocio[]>;
    findActiveNegocios(): Promise<Negocio[]>;
}