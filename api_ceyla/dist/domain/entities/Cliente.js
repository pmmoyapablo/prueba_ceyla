"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, numero_documento, nombre, apellido, email, telefono) {
        this.id = id;
        this.numero_documento = numero_documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }
}
exports.Cliente = Cliente;
