'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      Factura.belongsTo(models.Negocio, {
        foreignKey: 'negocio_id',
        as: 'negocio'
      });
      
      Factura.hasMany(models.FacturaDetalle, {
        foreignKey: 'factura_id',
        as: 'detalles'
      });
    }
  }
  
  Factura.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    negocio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'negocio',
        key: 'id'
      }
    },
    fecha_factura: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    valor_factura: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Factura',
    tableName: 'factura',
    timestamps: false
  });
  
  return Factura;
}; 