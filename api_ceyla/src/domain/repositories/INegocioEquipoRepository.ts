import { NegocioEquipo } from "../entities";
import { IRepository } from "./IRepository";

export interface INegocioEquipoRepository extends IRepository<NegocioEquipo> {
    findByNegocioId(negocioId: number): Promise<NegocioEquipo[]>;
    findByEquipoId(equipoId: number): Promise<NegocioEquipo[]>;
    getEquiposConNegocioActivo(): Promise<NegocioEquipo[]>;
    getTotalValorArrendamientoPorNegocio(negocioId: number): Promise<number>;
}