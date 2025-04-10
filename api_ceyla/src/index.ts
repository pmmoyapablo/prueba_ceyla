import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clienteRoutes from './infrastructure/http/routes/ClienteRoutes';
import negocioRoutes from './infrastructure/http/routes/NegocioRoutes';
import equipoRoutes from './infrastructure/http/routes/EquipoRoutes';
import facturaRoutes from './infrastructure/http/routes/FacturaRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000', // Permite solo este origen
    credentials: true, // Permite cookies/credenciales
    optionsSuccessStatus: 200 // Algunos navegadores legacy (IE11, varios SmartTVs) se ahogan con 204
};
  
app.use(cors(corsOptions));
  
app.use(express.json());
  
app.use('/api/clientes', clienteRoutes);
app.use('/api/negocios', negocioRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/facturas', facturaRoutes);
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});