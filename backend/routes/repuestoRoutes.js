const express = require('express');
const router = express.Router();
const controller = require('../controllers/repuestoController');

router.get('/', controller.obtenerRepuestos);
router.get('/:id', controller.obtenerRepuestoPorId);
router.post('/', controller.crearRepuesto);
router.put('/:id', controller.actualizarRepuesto);
router.delete('/:id', controller.eliminarRepuesto);

module.exports = router;
