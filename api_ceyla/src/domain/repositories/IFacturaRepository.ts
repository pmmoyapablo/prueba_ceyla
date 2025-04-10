import { Factura } from "../entities";
import { IRepository } from "./IRepository";

export interface IFacturaRepository extends IRepository<Factura> {
    findByNegocioId(negocioId: number): Promise<Factura[]>;
    findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Factura[]>;
    getTotalFacturadoPorNegocio(negocioId: number): Promise<number>;
}