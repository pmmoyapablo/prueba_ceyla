export interface EquipoNegocioDto {
  equipo_id: number;
  valor_arrendamiento: number;
  tarifa_iva: number;
}

export interface CreateNegocioDto {
  cliente_id: number;
  nombre: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  equipos: EquipoNegocioDto[];
} 