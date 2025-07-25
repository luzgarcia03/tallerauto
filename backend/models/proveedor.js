const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = require('./estado');

const Proveedor = sequelize.define('proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_proveedor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contacto_principal: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  nit: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  
}, {
  tableName: 'proveedor',
  timestamps: false
});

// Asociación con estado
Proveedor.belongsTo(Estado, {
    foreignKey: 'id_estado',
    as: 'estado'
  });
  
module.exports = Proveedor;
