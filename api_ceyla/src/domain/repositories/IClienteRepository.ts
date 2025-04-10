import { Cliente } from "../entities";
import { IRepository } from "./IRepository";

export interface IClienteRepository extends IRepository<Cliente> {
  findByEmail(email: string): Promise<Cliente | null>;
  findByNumeroDocumento(numeroDocumento: number): Promise<Cliente | null>;
}