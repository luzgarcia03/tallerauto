const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoVehiculo = sequelize.define('tipo_vehiculo', {
  id_tipo_vehiculo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre_tipo: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.STRING(200), allowNull: true }
}, {
  tableName: 'tipo_vehiculo',
  timestamps: false
});

module.exports = TipoVehiculo;
