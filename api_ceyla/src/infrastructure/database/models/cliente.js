'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // Definir asociaciones aquí
      Cliente.hasMany(models.Negocio, {
        foreignKey: 'cliente_id',
        as: 'negocios'
      });
    }
  }
  
  Cliente.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    numero_documento: {
      type: DataTypes.BIGINT(20),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telefono: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps: false
  });
  
  return Cliente;
}; 