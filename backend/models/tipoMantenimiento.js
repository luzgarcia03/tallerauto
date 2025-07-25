const {DataTypes} = require ('sequelize')
const sequelize = require('../config/database');

const TipoMantenimiento = sequelize.define('tipo_mantenimiento', {

    id_tipo_mantenimiento:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    nombre_tipo: { type: DataTypes.STRING(50), allowNull: false },
    descripcion: { type: DataTypes.STRING(200), allowNull: true }
},{

    tableName: 'tipo_mantenimiento',
    timestamps:false
});

module.exports = TipoMantenimiento;
