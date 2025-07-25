const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./empleado');
const Estado = require('./estado')

const Solicitud_Herramienta = sequelize.define('solicitud_herramienta', {
  id_solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleado',
      key: 'id_empleado'
    }
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_requerida: {
    type: DataTypes.DATE,
    allowNull: false
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'estado',
        key: 'id_estado'
    }
  }
}, {
  tableName: 'solicitud_herramienta',
  timestamps: false
});

// Relación:
Solicitud_Herramienta.belongsTo(Empleado, { foreignKey: 'empleado_id' });
Solicitud_Herramienta.belongsTo(Estado, { foreignKey: 'id_estado', as: 'estado' });

module.exports = Solicitud_Herramienta;
