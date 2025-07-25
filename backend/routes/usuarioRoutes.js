const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');

router.get('/', usuarioCtrl.obtenerUsuarios);
router.post('/', usuarioCtrl.crearUsuario);
router.get('/:id', usuarioCtrl.obtenerUsuarioPorId);
router.put('/:id', usuarioCtrl.actualizarUsuario);
router.delete('/:id', usuarioCtrl.eliminarUsuario);


module.exports = router;
