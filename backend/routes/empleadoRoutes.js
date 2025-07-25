const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Obtener todos los empleados (con persona y estado)
router.get('/', empleadoController.obtenerEmpleados);

// Obtener un empleado por ID
router.get('/:id', empleadoController.obtenerEmpleadoPorId);

// Crear un nuevo empleado
router.post('/', empleadoController.crearEmpleado);

// Actualizar un empleado existente
router.put('/:id', empleadoController.actualizarEmpleado);

// Eliminar un empleado
router.delete('/:id', empleadoController.eliminarEmpleado);

module.exports = router;
