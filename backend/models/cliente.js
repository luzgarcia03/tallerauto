const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona');

const Cliente = sequelize.define('cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persona_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'persona',
      key: 'id_persona'
    }
  },
  nit: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  dpi: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  puntos_fidelidad: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'cliente',
  timestamps: false
});

// Relación: cliente pertenece a una persona

Cliente.belongsTo(Persona, {
  foreignKey: 'persona_id',
  as: 'persona'
});

module.exports = Cliente;
