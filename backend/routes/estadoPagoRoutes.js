const express = require('express');
const router = express.Router();
// estadoRoutes.js
const estadoPagoController = require('../controllers/estadoPagoController');

// GET - Listar todos los estados
router.get('/', estadoPagoController.obtenerEstadosPago);

// POST - Crear nuevo estado
router.post('/', estadoPagoController.crearEstadoPago);

// PUT - Editar estado
router.put('/:id', estadoPagoController.actualizarEstado);

// GET - Obtener estado por ID
router.get('/:id', estadoPagoController.obtenerEstadoPagoPorId);

// DELETE - Eliminar estado
router.delete('/:id', estadoPagoController.eliminarEstado);

module.exports = router;
