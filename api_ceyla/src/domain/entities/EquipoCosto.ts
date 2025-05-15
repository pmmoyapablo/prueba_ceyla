export class EquipoCosto {
  public id: number;
  public equipo_id: number;
  public fecha: Date;
  public descripcion: string;
  public valor: number;
  public tipo: 'MANTENIMIENTO' | 'ARREGLO';

  constructor(
    id: number,
    equipo_id: number,
    fecha: Date,
    descripcion: string,
    valor: number,
    tipo: 'MANTENIMIENTO' | 'ARREGLO'
  ) {
    this.id = id;
    this.equipo_id = equipo_id;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.valor = valor;
    this.tipo = tipo;
  }
} 