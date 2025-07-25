const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = require('./estado');
const CategoriaRepuesto = require('./categoriaRepuesto');

const Repuesto = sequelize.define('repuesto', {
  id_repuesto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  categoria_id: { type: DataTypes.INTEGER, allowNull: false },
  codigo_repuesto: { type: DataTypes.STRING(30), allowNull: false },
  nombre_repuesto: { type: DataTypes.STRING(100), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  marca: { type: DataTypes.STRING(50), allowNull: true },
  modelo_compatible: { type: DataTypes.STRING(100), allowNull: true },
  precio_compra: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  precio_venta: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  stock_minimo: { type: DataTypes.INTEGER, allowNull: true },
  id_estado: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'repuesto',
  timestamps: false
});

Repuesto.belongsTo(CategoriaRepuesto, { foreignKey: 'categoria_id', as: 'categoria' });
Repuesto.belongsTo(Estado, { foreignKey: 'id_estado', as: 'estado' });

module.exports = Repuesto;
