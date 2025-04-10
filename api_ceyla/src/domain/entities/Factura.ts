export class Factura {
  public id: number;
  public negocio_id: number;
  public fecha_factura: Date;
  public valor_factura: number;

  constructor(
    id: number,
    negocio_id: number,
    fecha_factura: Date,
    valor_factura: number
  ) {
    this.id = id;
    this.negocio_id = negocio_id;
    this.fecha_factura = fecha_factura;
    this.valor_factura = valor_factura;
  }
} 