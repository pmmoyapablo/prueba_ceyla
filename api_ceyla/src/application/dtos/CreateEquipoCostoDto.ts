export interface CreateEquipoCostoDto {
  equipo_id: number;
  fecha: Date;
  descripcion: string;
  valor: number;
  tipo: 'MANTENIMIENTO' | 'ARREGLO';
} 