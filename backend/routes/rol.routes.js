const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const verificarToken = require('../middleware/verificarToken');
const checkPermiso = require('../middleware/checkPermiso');

// Obtener rol con permisos
router.get('/:id',
  verificarToken,
  checkPermiso('rol.asignarPermisos'),
  rolController.obtenerRolConPermisos
);

// Asignar permiso
router.post('/:id/permisos',
  verificarToken,
  checkPermiso('rol.asignarPermisos'),
  rolController.asignarPermiso
);

// Eliminar permiso
router.delete('/:id/permisos',
  verificarToken,
  checkPermiso('rol.asignarPermisos'),
  rolController.removerPermiso
);

module.exports = router;
