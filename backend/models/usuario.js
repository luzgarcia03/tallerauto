const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./persona');
const Rol = require('./rol'); // ✅ Importa el modelo de rol

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_persona: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_creacion: DataTypes.DATE,
  ultimo_acceso: DataTypes.DATE,
  estado_usuario_id: DataTypes.INTEGER,
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

Usuario.belongsTo(Persona, {
  foreignKey: 'id_persona',
  as: 'persona'
});

Usuario.belongsTo(Rol, {
  foreignKey: 'rol_id',
  as: 'rol'
});

module.exports = Usuario;
