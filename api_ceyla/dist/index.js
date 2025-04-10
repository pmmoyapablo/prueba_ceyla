"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ClienteRoutes_1 = __importDefault(require("./infrastructure/http/routes/ClienteRoutes"));
const NegocioRoutes_1 = __importDefault(require("./infrastructure/http/routes/NegocioRoutes"));
const EquipoRoutes_1 = __importDefault(require("./infrastructure/http/routes/EquipoRoutes"));
const FacturaRoutes_1 = __importDefault(require("./infrastructure/http/routes/FacturaRoutes"));
const swagger_1 = require("./infrastructure/config/swagger"); // Commented out since module not found
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:3000', // Permite solo este origen
    credentials: true, // Permite cookies/credenciales
    optionsSuccessStatus: 200 // Algunos navegadores legacy (IE11, varios SmartTVs) se ahogan con 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Configuración de Swagger
(0, swagger_1.setupSwagger)(app);
app.use('/api/clientes', ClienteRoutes_1.default);
app.use('/api/negocios', NegocioRoutes_1.default);
app.use('/api/equipos', EquipoRoutes_1.default);
app.use('/api/facturas', FacturaRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
