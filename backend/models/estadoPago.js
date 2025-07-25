const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoPago = sequelize.define('estado_pago', {
  id_estado_pago: {
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
  tableName: 'estado_pago',
  timestamps: false
});

module.exports = EstadoPago;
