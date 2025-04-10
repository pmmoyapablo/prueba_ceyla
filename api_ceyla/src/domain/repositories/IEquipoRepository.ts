import { Equipo } from "../entities";
import { IRepository } from "./IRepository";

export interface IEquipoRepository extends IRepository<Equipo> {
    findBySerial(serial: string): Promise<Equipo | null>;
    findByReferencia(referencia: string): Promise<Equipo[]>;
    findDisponibles(): Promise<Equipo[]>;
}