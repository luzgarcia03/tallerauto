const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicioController');

router.get('/', controller.obtenerServicios);
router.get('/:id', controller.obtenerServicioPorId);
router.post('/', controller.crearServicio);
router.put('/:id', controller.actualizarServicio);
router.delete('/:id', controller.eliminarServicio);

module.exports = router;
