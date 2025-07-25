const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estado = sequelize.define('estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_estado: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'estado',
  timestamps: false
});

module.exports = Estado;
