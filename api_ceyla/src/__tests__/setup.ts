import { jest } from '@jest/globals';

// Configuración global de Jest
jest.setTimeout(10000);

// Configuración de variables de entorno
process.env.NODE_ENV = 'test'; 