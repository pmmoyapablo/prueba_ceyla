"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./RepositoryBase"), exports);
__exportStar(require("./ClienteRepository"), exports);
__exportStar(require("./NegocioRepository"), exports);
__exportStar(require("./EquipoRepository"), exports);
__exportStar(require("./EquipoCostoRepository"), exports);
__exportStar(require("./NegocioEquipoRepository"), exports);
__exportStar(require("./FacturaRepository"), exports);
__exportStar(require("./FacturaDetalleRepository"), exports);
