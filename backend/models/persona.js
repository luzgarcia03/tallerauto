const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estado = require('./estado');
const Persona = sequelize.define('persona', {
  id_persona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  primer_nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  segundo_nombre: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  primer_apellido: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  segundo_apellido: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  municipio: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  departamento: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  zona: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_estado: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'persona',
  timestamps: false
});


Persona.belongsTo(Estado, {
    foreignKey: 'id_estado',
    as: 'estado'
  });
module.exports = Persona;
