const express = require('express');
const router = express.Router();
// estadoRoutes.js
const estadoController = require('../controllers/estadoController');

// GET - Listar todos los estados
router.get('/', estadoController.obtenerEstados);

// POST - Crear nuevo estado
router.post('/', estadoController.crearEstado);

// PUT - Editar estado
router.put('/:id', estadoController.actualizarEstado);

// GET - Obtener estado por ID
router.get('/:id', estadoController.obtenerEstadoPorId);

// DELETE - Eliminar estado
router.delete('/:id', estadoController.eliminarEstado);

module.exports = router;
