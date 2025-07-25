const express = require('express');
const router = express.Router();
const controller = require('../controllers/marcaVehiculoController');

// Listar todas las marcas de vehículos
router.get('/', controller.obtenerMarcasVehiculo);

// Obtener una marca por ID
router.get('/:id', controller.obtenerMarcaVehiculoPorId);

// Crear una nueva marca
router.post('/', controller.crearMarcaVehiculo);

// Actualizar una marca existente
router.put('/:id', controller.actualizarMarcaVehiculo);

// Eliminar una marca
router.delete('/:id', controller.eliminarMarcaVehiculo);

module.exports = router;
