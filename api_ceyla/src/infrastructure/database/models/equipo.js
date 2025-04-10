'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipo extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      Equipo.hasMany(models.EquipoCosto, {
        foreignKey: 'equipo_id',
        as: 'costos'
      });
      
      Equipo.hasMany(models.NegocioEquipo, {
        foreignKey: 'equipo_id',
        as: 'negocios'
      });
    }
  }
  
  Equipo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serial: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    referencia: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    valor_compra: {
      type: DataTypes.BIGINT(20),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Equipo',
    tableName: 'equipo',
    timestamps: false
  });
  
  return Equipo;
}; 