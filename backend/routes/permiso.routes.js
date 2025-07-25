const express = require('express');
const router = express.Router();
const permisoController = require('../controllers/permisoController');

const verificarToken = require('../middleware/verificarToken');
const checkPermiso = require('../middleware/checkPermiso');

router.get(
  '/',
  verificarToken,
  checkPermiso('rol.asignarPermisos'),
  permisoController.obtenerPermisosDisponibles
);

module.exports = router;
