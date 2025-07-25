const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = require('./estado');
const Inspeccion = require('./inspeccion');
const Empleado = require('./empleado');

const Diagnostico = sequelize.define(
  'diagnostico',
  {
    id_diagnostico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    inspeccion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fecha_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    descripcion_problema: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    recomendaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'diagnostico',
    timestamps: false,
  }
);

Diagnostico.belongsTo(Inspeccion, {
  foreignKey: 'inspeccion_id',
  as: 'inspeccion',
});

Diagnostico.belongsTo(Empleado, {
  foreignKey: 'empleado_id',
  as: 'empleado',
});
Repuesto.belongsTo(Estado, {
  foreignKey: 'id_estado',
  as: 'estado',
});

module.exports = Diagnostico;
