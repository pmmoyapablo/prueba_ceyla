export class Equipo {
  public id: number;
  public serial: string;
  public referencia: string;
  public valor_compra: number;

  constructor(
    id: number,
    serial: string,
    referencia: string,
    valor_compra: number
  ) {
    this.id = id;
    this.serial = serial;
    this.referencia = referencia;
    this.valor_compra = valor_compra;
  }
} 