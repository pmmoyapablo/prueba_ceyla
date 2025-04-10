'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Negocio extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      Negocio.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'cliente'
      });
    }
  }
  
  Negocio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cliente',
        key: 'id'
      }
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Negocio',
    tableName: 'negocio',
    timestamps: false
  });
  
  return Negocio;
}; 