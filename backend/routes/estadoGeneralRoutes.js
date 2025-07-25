const express = require('express');
const router = express.Router();
// estadoRoutes.js
const estadoGeneralController = require('../controllers/estadoGeneralController');

// GET - Listar todos los estados
router.get('/', estadoGeneralController.obtenerEstadosGeneral);

// POST - Crear nuevo estado
router.post('/', estadoGeneralController.crearEstadoGeneral);

// PUT - Editar estado
router.put('/:id', estadoGeneralController.actualizarEstado);

// GET - Obtener estado por ID
router.get('/:id', estadoGeneralController.obtenerEstadoGeneralPorId);

// DELETE - Eliminar estado
router.delete('/:id', estadoGeneralController.eliminarEstado);

module.exports = router;