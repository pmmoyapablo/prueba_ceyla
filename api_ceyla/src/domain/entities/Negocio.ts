export class Negocio {
  public id: number;
  public cliente_id: number;
  public nombre: string;
  public fecha_inicio: Date;
  public fecha_fin: Date;

  constructor(
    id: number,
    cliente_id: number,
    nombre: string,
    fecha_inicio: Date,
    fecha_fin: Date
  ) {
    this.id = id;
    this.cliente_id = cliente_id;
    this.nombre = nombre;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
  }
} 