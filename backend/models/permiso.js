const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Permiso = sequelize.define('permiso', {
  id_permiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_permiso: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'permiso',
  timestamps: false
});

module.exports = Permiso;
