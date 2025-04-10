'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FacturaDetalle extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      FacturaDetalle.belongsTo(models.Factura, {
        foreignKey: 'factura_id',
        as: 'factura'
      });
      
      FacturaDetalle.belongsTo(models.NegocioEquipo, {
        foreignKey: 'negocio_equipo_id',
        as: 'negocioEquipo'
      });
    }
  }
  
  FacturaDetalle.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'factura',
        key: 'id'
      }
    },
    negocio_equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'negocio_equipo',
        key: 'id'
      }
    },
    valor: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FacturaDetalle',
    tableName: 'factura_detalle',
    timestamps: false
  });
  
  return FacturaDetalle;
}; 