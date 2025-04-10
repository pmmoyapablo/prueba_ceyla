'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NegocioEquipo extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      NegocioEquipo.belongsTo(models.Negocio, {
        foreignKey: 'negocio_id',
        as: 'negocio'
      });
      
      NegocioEquipo.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
        as: 'equipo'
      });
      
      NegocioEquipo.hasMany(models.FacturaDetalle, {
        foreignKey: 'negocio_equipo_id',
        as: 'facturaDetalles'
      });
    }
  }
  
  NegocioEquipo.init({
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
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipo',
        key: 'id'
      }
    },
    valor_arrendamiento: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    tarifa_iva: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: 19
    },
    valor_total: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'NegocioEquipo',
    tableName: 'negocio_equipo',
    timestamps: false
  });
  
  return NegocioEquipo;
}; 