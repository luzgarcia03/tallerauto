const express = require('express');
const router = express.Router();
const tipoVehiculoController = require('../controllers/tipoVehiculoController');

// Ruta para obtener todos los tipos de vehículo
router.get('/', tipoVehiculoController.obtenerTiposVehiculo);

// Ruta para obtener un tipo de vehículo por ID
router.get('/:id', tipoVehiculoController.obtenerTipoVehiculoPorId);

// Ruta para crear un nuevo tipo de vehículo
router.post('/', tipoVehiculoController.crearTipoVehiculo);

// Ruta para actualizar un tipo de vehículo
router.put('/:id', tipoVehiculoController.actualizarTipoVehiculo);

// Ruta para eliminar un tipo de vehículo
router.delete('/:id', tipoVehiculoController.eliminarTipoVehiculo);

module.exports = router;
