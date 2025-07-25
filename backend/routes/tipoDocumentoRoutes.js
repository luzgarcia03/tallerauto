const express = require('express');
const router = express.Router();
const controlador = require('../controllers/tipoDocumentoController');

router.get('/', controlador.obtenerTipoDocumento);
router.get('/:id', controlador.obtenerTipoDocumentoPorId);
router.post('/', controlador.crearTipoDocumento);
router.put('/:id', controlador.actualizarTipoDocumento);
router.delete('/:id', controlador.eliminarTipoDocumento);

module.exports = router;
