export class FacturaDetalle {
  public id: number;
  public factura_id: number;
  public negocio_equipo_id: number;
  public valor: number;

  constructor(
    id: number,
    factura_id: number,
    negocio_equipo_id: number,
    valor: number
  ) {
    this.id = id;
    this.factura_id = factura_id;
    this.negocio_equipo_id = negocio_equipo_id;
    this.valor = valor;
  }
} 