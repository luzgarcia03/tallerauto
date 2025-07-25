const permisos = require('../config/permisos');

exports.obtenerPermisosDisponibles = (req, res) => {
  res.json(permisos);
};
