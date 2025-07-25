const express = require('express');
const router = express.Router();
const tipoMantenimientoController = require('../controllers/tipoMantenimientoController');

// Ruta para obtener todos los tipos de vehículo
router.get('/', tipoMantenimientoController.obtenerTiposMantenimiento);

// Ruta para obtener un tipo de vehículo por ID
router.get('/:id', tipoMantenimientoController.obtenerTipoMantenimientoPorId);

// Ruta para crear un nuevo tipo de vehículo
router.post('/', tipoMantenimientoController.crearTipoMantenimiento);

// Ruta para actualizar un tipo de vehículo
router.put('/:id', tipoMantenimientoController.actualizarTipoMantenimiento);

// Ruta para eliminar un tipo de vehículo
router.delete('/:id', tipoMantenimientoController.eliminarTipoMantenimiento);

module.exports = router;
