const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MarcaVehiculo = sequelize.define('marca_vehiculo', {
  id_marca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  tableName: 'marca_vehiculo',
  timestamps: false
});

module.exports = MarcaVehiculo;
