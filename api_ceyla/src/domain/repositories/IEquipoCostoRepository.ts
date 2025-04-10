import { EquipoCosto } from "../entities";
import { IRepository } from "./IRepository";

export interface IEquipoCostoRepository extends IRepository<EquipoCosto> {
    findByEquipoId(equipoId: number): Promise<EquipoCosto[]>;
    findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<EquipoCosto[]>;
    getTotalCostosPorEquipo(equipoId: number): Promise<number>;
}