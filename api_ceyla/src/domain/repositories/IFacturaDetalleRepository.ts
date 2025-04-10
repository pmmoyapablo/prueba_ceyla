import { FacturaDetalle } from "../entities";
import { IRepository } from "./IRepository";

export interface IFacturaDetalleRepository extends IRepository<FacturaDetalle> {
    findByFacturaId(facturaId: number): Promise<FacturaDetalle[]>;
    findByNegocioEquipoId(negocioEquipoId: number): Promise<FacturaDetalle[]>;
    getTotalValorPorFactura(facturaId: number): Promise<number>;
    getDetallesConInfoEquipo(facturaId: number): Promise<any[]>;
}