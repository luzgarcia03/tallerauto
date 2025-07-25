const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoGeneral = sequelize.define('estado_general', {
    id_estado_general: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_estado: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      descripcion_estado: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    
},  {
    tableName: 'estado_general',
    timestamps: false 
  });
  
  module.exports = EstadoGeneral;