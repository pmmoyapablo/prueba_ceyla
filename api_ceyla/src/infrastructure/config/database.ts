import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'adminMysqlser_dev.123',
  database: process.env.DB_NAME || 'Ceyla',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 