const express = require('express');
const router = express.Router();
const controlador = require('../controllers/solicitudHerramientaController');

router.get('/', controlador.obtenerSolicitud);
router.get('/:id', controlador.obtenerSolicitudPorId);
router.post('/', controlador.crearSolicitud);
router.put('/:id', controlador.actualizarSolicitud);
router.delete('/:id', controlador.eliminarSolicitud);

module.exports = router;
