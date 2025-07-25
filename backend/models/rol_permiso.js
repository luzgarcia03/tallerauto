const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./rol');
const Permiso = require('./permiso');

const RolPermiso = sequelize.define('rol_permiso', {
  id_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Rol,
      key: 'id_rol'
    }
  },
  id_permiso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Permiso,
      key: 'id_permiso'
    }
  }
}, {
  tableName: 'rol_permiso',
  timestamps: false
});

// Relaciones
Rol.belongsToMany(Permiso, {
  through: RolPermiso,
  foreignKey: 'id_rol',
  otherKey: 'id_permiso'
});
Permiso.belongsToMany(Rol, {
  through: RolPermiso,
  foreignKey: 'id_permiso',
  otherKey: 'id_rol'
});

module.exports = RolPermiso;
