const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = require('./estado');

const Servicio = sequelize.define(
  'servicio',
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_servicio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duracion_estimada: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    costo_estimado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    tableName: 'servicio',
    timestamps: false,
  }
);

Servicio.belongsTo(Estado, { foreignKey: 'id_estado', as: 'estado' });

module.exports = Servicio;
