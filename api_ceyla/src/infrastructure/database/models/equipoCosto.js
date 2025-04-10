'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EquipoCosto extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      EquipoCosto.belongsTo(models.Equipo, {
        foreignKey: 'equipo_id',
        as: 'equipo'
      });
    }
  }
  
  EquipoCosto.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    equipo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'equipo',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    valor: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EquipoCosto',
    tableName: 'equipo_costo',
    timestamps: false
  });
  
  return EquipoCosto;
}; 