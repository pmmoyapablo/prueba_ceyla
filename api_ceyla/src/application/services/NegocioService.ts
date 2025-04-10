import { INegocioRepository } from '../../domain/repositories/INegocioRepository';
import { Negocio } from '../../domain/entities/Negocio';
import { IResponse } from '../Response';

export class NegocioService {
    constructor(private negocioRepository: INegocioRepository) {}

    async getNegocios(): Promise<IResponse> {
        try {
            const negocios = await this.negocioRepository.findAll();
            return {
                success: true,
                message: 'Negocios encontrados',
                data: negocios
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener negocios',
                data: null
            };
        }
    }

    async getNegocioById(id: number): Promise<IResponse> {
        try {
            const negocio = await this.negocioRepository.findById(id);
            if (!negocio) {
                return {
                    success: false,
                    message: 'Negocio no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Negocio encontrado',
                data: negocio
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener negocio',
                data: null
            };
        }
    }

    async createNegocio(negocio: Negocio): Promise<IResponse> {
        try {
            const newNegocio = await this.negocioRepository.create(negocio);
            return {
                success: true,
                message: 'Negocio creado exitosamente',
                data: newNegocio
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear negocio',
                data: null
              };
          }
   }

    async updateNegocio(id: number, negocio: Negocio): Promise<IResponse> {
        try {
            const updatedNegocio = await this.negocioRepository.update(id, negocio);
            if (!updatedNegocio) {
                return {
                    success: false,
                    message: 'Negocio no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Negocio actualizado exitosamente',
                data: updatedNegocio
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar negocio',
                data: null
            };
        }
    }

    async deleteNegocio(id: number): Promise<IResponse> {
        try {
            const result = await this.negocioRepository.delete(id);
            if (!result) {
                return {
                    success: false,
                    message: 'Negocio no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Negocio eliminado exitosamente',
                data: true
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al eliminar negocio',
                data: null
            };
        }
    }
} 