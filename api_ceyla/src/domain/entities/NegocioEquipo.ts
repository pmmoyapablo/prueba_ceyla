export class NegocioEquipo {
  public id: number;
  public negocio_id: number;
  public equipo_id: number;
  public valor_arrendamiento: number;
  public tarifa_iva: number;
  public valor_total: number;

  constructor(
    id: number,
    negocio_id: number,
    equipo_id: number,
    valor_arrendamiento: number,
    tarifa_iva: number,
    valor_total: number
  ) {
    this.id = id;
    this.negocio_id = negocio_id;
    this.equipo_id = equipo_id;
    this.valor_arrendamiento = valor_arrendamiento;
    this.tarifa_iva = tarifa_iva;
    this.valor_total = valor_total;
  }
} 