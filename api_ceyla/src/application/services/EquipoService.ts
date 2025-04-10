import { IEquipoRepository } from '../../domain/repositories/IEquipoRepository';
import { Equipo } from '../../domain/entities/Equipo';
import { IResponse } from '../Response';

export class EquipoService {
    constructor(private equipoRepository: IEquipoRepository) {}

    async getEquipos(): Promise<IResponse> {
        try {
            const equipos = await this.equipoRepository.findAll();
            return {
                success: true,
                message: 'Equipos encontrados',
                data: equipos
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener equipos',
                data: null
            };
        }
    }

    async getEquipoById(id: number): Promise<IResponse> {
        try {
            const equipo = await this.equipoRepository.findById(id);
            if (!equipo) {
                return {
                    success: false,
                    message: 'Equipo no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Equipo encontrado',
                data: equipo
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener equipo',
                data: null
            };
        }
    }

    async createEquipo(equipo: Equipo): Promise<IResponse> {
        try {
            const newEquipo = await this.equipoRepository.create(equipo);
            return {
                success: true,
                message: 'Equipo creado exitosamente',
                data: newEquipo
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al crear equipo',
                data: null
            };
        }
    }

    async updateEquipo(id: number, equipo: Equipo): Promise<IResponse> {
        try {
            const updatedEquipo = await this.equipoRepository.update(id, equipo);
            if (!updatedEquipo) {
                return {
                    success: false,
                    message: 'Equipo no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Equipo actualizado exitosamente',
                data: updatedEquipo
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar equipo',
                data: null
            };
        }
    }

    async deleteEquipo(id: number): Promise<IResponse> {
        try {
            const result = await this.equipoRepository.delete(id);
            if (!result) {
                return {
                    success: false,
                    message: 'Equipo no encontrado',
                    data: null
                };
            }
            return {
                success: true,
                message: 'Equipo eliminado exitosamente',
                data: true
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al eliminar equipo',
                data: null
            };
        }
    }
} 