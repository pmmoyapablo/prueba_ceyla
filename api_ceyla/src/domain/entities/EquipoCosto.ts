export class EquipoCosto {
  public id: number;
  public equipo_id: number;
  public fecha: Date;
  public descripcion: string;
  public valor: number;

  constructor(
    id: number,
    equipo_id: number,
    fecha: Date,
    descripcion: string,
    valor: number
  ) {
    this.id = id;
    this.equipo_id = equipo_id;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.valor = valor;
  }
} 