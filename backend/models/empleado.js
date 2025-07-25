const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona');
const Estado = require('./estado');

const Empleado = sequelize.define('empleado', {
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigo_empleado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  fecha_contratacion: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'empleado',
  timestamps: false
});

// Relaciones
Empleado.belongsTo(Persona, {
  foreignKey: 'id_persona',
  as: 'persona'
});

Empleado.belongsTo(Estado, {
  foreignKey: 'id_estado',
  as: 'estado'
});

module.exports = Empleado;
