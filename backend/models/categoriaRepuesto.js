const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoriaRepuesto = sequelize.define('categoria_repuesto', {
  id_categoria_repuesto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_categoria: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  tableName: 'categoria_repuesto',
  timestamps: false
});

module.exports = CategoriaRepuesto;
