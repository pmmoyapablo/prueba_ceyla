export class Cliente {
  public id: number;
  public numero_documento: number;
  public nombre: string;
  public apellido: string;
  public email: string;
  public telefono: string;

  constructor(
    id: number,
    numero_documento: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string
  ) {
    this.id = id;
    this.numero_documento = numero_documento;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.telefono = telefono;
  }
} 