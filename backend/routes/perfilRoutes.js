const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, perfilController.obtenerPerfil);
router.put('/', authMiddleware, perfilController.actualizarPerfil);
router.put('/password', authMiddleware, perfilController.actualizarContrasenia);

module.exports = router;
