import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Celya',
      version: '1.0.0',
      description: 'Documentación de la API de Celya',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'desarrollo@celya.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Equipo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del equipo'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del equipo'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del equipo'
            },
            estado: {
              type: 'string',
              description: 'Estado del equipo',
              enum: ['activo', 'inactivo', 'mantenimiento']
            },
            fechaAdquisicion: {
              type: 'string',
              format: 'date',
              description: 'Fecha de adquisición del equipo'
            },
            ultimoMantenimiento: {
              type: 'string',
              format: 'date',
              description: 'Fecha del último mantenimiento'
            },
            proximoMantenimiento: {
              type: 'string',
              format: 'date',
              description: 'Fecha del próximo mantenimiento programado'
            }
          },
          required: ['nombre', 'estado']
        },
        Cliente: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del cliente'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del cliente'
            },
            apellido: {
              type: 'string',
              description: 'Apellido del cliente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del cliente'
            },
            telefono: {
              type: 'string',
              description: 'Número de teléfono del cliente'
            },
            direccion: {
              type: 'string',
              description: 'Dirección del cliente'
            },
            fechaRegistro: {
              type: 'string',
              format: 'date',
              description: 'Fecha de registro del cliente'
            }
          },
          required: ['nombre', 'apellido', 'email']
        },
        Negocio: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del negocio'
            },
            nombre: {
              type: 'string',
              description: 'Nombre del negocio'
            },
            direccion: {
              type: 'string',
              description: 'Dirección del negocio'
            },
            telefono: {
              type: 'string',
              description: 'Número de teléfono del negocio'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del negocio'
            },
            ruc: {
              type: 'string',
              description: 'RUC del negocio'
            },
            fechaRegistro: {
              type: 'string',
              format: 'date',
              description: 'Fecha de registro del negocio'
            }
          },
          required: ['nombre', 'ruc', 'email']
        },
        Factura: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID de la factura'
            },
            numero: {
              type: 'string',
              description: 'Número de factura'
            },
            fecha: {
              type: 'string',
              format: 'date',
              description: 'Fecha de emisión de la factura'
            },
            clienteId: {
              type: 'integer',
              description: 'ID del cliente'
            },
            negocioId: {
              type: 'integer',
              description: 'ID del negocio'
            },
            subtotal: {
              type: 'number',
              format: 'float',
              description: 'Subtotal de la factura'
            },
            iva: {
              type: 'number',
              format: 'float',
              description: 'IVA de la factura'
            },
            total: {
              type: 'number',
              format: 'float',
              description: 'Total de la factura'
            },
            estado: {
              type: 'string',
              description: 'Estado de la factura',
              enum: ['pendiente', 'pagada', 'anulada']
            }
          },
          required: ['numero', 'fecha', 'clienteId', 'negocioId', 'subtotal', 'iva', 'total', 'estado']
        }
      }
    }
  },
  apis: [
    './src/infrastructure/http/routes/*.ts',  // Ruta a los archivos de rutas
    './dist/infrastructure/http/routes/*.js'  // Ruta a los archivos compilados
  ]
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true
    }
  }));
  app.get('/api-docs.json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}; 