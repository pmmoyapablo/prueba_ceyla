#!/bin/bash

# Ejecutar migraciones en el orden correcto
npm run migrate

# Ejecutar seeders en el orden correcto
# Primero los datos base que no tienen dependencias
npm run seed:cliente
npm run seed:negocio
npm run seed:equipo

# Luego los datos que dependen de los anteriores
npm run seed:equipo-costo
npm run seed:negocio-equipo
npm run seed:factura
npm run seed:factura-detalle

# Iniciar la aplicación
npm run dev