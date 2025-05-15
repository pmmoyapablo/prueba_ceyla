import { INegocioRepository } from '../../domain/repositories/INegocioRepository';
import { Negocio } from '../../domain/entities/Negocio';
import { IResponse } from '../Response';
import { NegocioEquipo } from '../../domain/entities/NegocioEquipo';
import { Factura } from '../../domain/entities/Factura';
import { FacturaDetalle } from '../../domain/entities/FacturaDetalle';
import { CreateNegocioDto, EquipoNegocioDto } from '../dtos/CreateNegocioDto';
import { Op } from 'sequelize';
import { IFacturaRepository } from '@/domain/repositories/IFacturaRepository';
import { INegocioEquipoRepository } from '@/domain/repositories/INegocioEquipoRepository';
import { IFacturaDetalleRepository } from '@/domain/repositories/IFacturaDetalleRepository';

export class NegocioService {
    constructor(
        private negocioRepository: any,
        private negocioEquipoRepository: any,
        private facturaRepository: any,
        private facturaDetalleRepository: any
    ) {}

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

    async createNegocioWithEquipos(dto: CreateNegocioDto): Promise<IResponse> {
        try {
            // Crear el negocio
            const negocioData = {
                id: 0, // El repositorio asignará el ID real
                cliente_id: dto.cliente_id,
                nombre: dto.nombre,
                fecha_inicio: dto.fecha_inicio,
                fecha_fin: dto.fecha_fin
            };
            
            const negocio = await this.negocioRepository.create(negocioData as any);

            // Crear los equipos asociados al negocio
            for (const equipo of dto.equipos) {
                const valor_total = equipo.valor_arrendamiento * (1 + equipo.tarifa_iva);
                await this.negocioEquipoRepository.create({
                    id: 0, // El repositorio asignará el ID real
                    negocio_id: negocio.id,
                    equipo_id: equipo.equipo_id,
                    valor_arrendamiento: equipo.valor_arrendamiento,
                    tarifa_iva: equipo.tarifa_iva,
                    valor_total: valor_total
                } as any);
            }

            return { success: true, message: 'Negocio creado exitosamente', data: negocio };
        } catch (error) {
            return { success: false, message: 'Error al crear el negocio', data: null };
        }
    }

    async generarFacturasMensuales(): Promise<IResponse> {
        try {
            const fechaActual = new Date();
            const ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0);
            
            // Obtener todos los negocios activos
            const negocios = await this.negocioRepository.findAll();
            const negociosActivos = negocios.filter((negocio: Negocio) => 
                negocio.fecha_fin >= fechaActual
            );

            const facturasGeneradas: Factura[] = [];

            for (const negocio of negociosActivos) {
                // Obtener los equipos del negocio
                const equiposNegocio = await this.negocioEquipoRepository.findAll();
                const equiposDelNegocio = equiposNegocio.filter((eq: NegocioEquipo) => eq.negocio_id === negocio.id);

                // Calcular el valor total de la factura
                let subtotal = 0;
                let iva = 0;

                for (const equipo of equiposDelNegocio) {
                    // Calcular días prorrateados si es necesario
                    const diasEnMes = ultimoDiaMesAnterior.getDate();
                    const diasProrrateados = negocio.fecha_inicio.getDate() === 1 ? 
                        diasEnMes : 
                        diasEnMes - negocio.fecha_inicio.getDate() + 1;

                    const valorDiario = equipo.valor_arrendamiento / diasEnMes;
                    const valorProrrateado = valorDiario * diasProrrateados;
                    
                    subtotal += valorProrrateado;
                    iva += valorProrrateado * equipo.tarifa_iva;
                }

                const total = subtotal + iva;

                // Crear la factura
                const factura = await this.facturaRepository.create({
                    id: 0, // El repositorio asignará el ID real
                    fecha_factura: ultimoDiaMesAnterior,
                    subtotal,
                    iva,
                    total,
                    cliente_id: negocio.cliente_id
                } as any);

                // Crear los detalles de la factura
                for (const equipo of equiposDelNegocio) {
                    await this.facturaDetalleRepository.create({
                        id: 0, // El repositorio asignará el ID real
                        factura_id: factura.id,
                        equipo_id: equipo.equipo_id,
                        valor_arrendamiento: equipo.valor_arrendamiento,
                        tarifa_iva: equipo.tarifa_iva,
                        valor_total: equipo.valor_total
                    } as any);
                }

                facturasGeneradas.push(factura);
            }

            return { success: true, message: 'Facturas generadas exitosamente', data: facturasGeneradas };
        } catch (error) {
            return { success: false, message: 'Error al generar facturas', data: null };
        }
    }
} 