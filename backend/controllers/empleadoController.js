const Empleado = require('../models/empleado');
const Persona = require('../models/persona');
const Estado = require('../models/estado');

// Obtener todos los empleados con su persona y estado
exports.obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      include: [
        { model: Persona, as: 'persona' },
        { model: Estado, as: 'estado' }
      ]
    });
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};

// Obtener un empleado por ID
exports.obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id, {
      include: [
        { model: Persona, as: 'persona' },
        { model: Estado, as: 'estado' }
      ]
    });

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    res.json(empleado);
  } catch (error) {
    console.error('Error al obtener empleado:', error);
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

// Crear un nuevo empleado
// Crear un nuevo empleado
exports.crearEmpleado = async (req, res) => {
    const { persona, codigo_empleado, fecha_contratacion, id_estado } = req.body;
  
    try {
      // Primero, crea la persona
      const nuevaPersona = await Persona.create(persona);
      
      // Verificamos si la persona fue creada correctamente y obtenemos su id_persona
      if (!nuevaPersona) {
        return res.status(400).json({ error: 'Error al crear persona' });
      }
  
      // Luego, creamos el empleado usando el id_persona generado
      const nuevoEmpleado = await Empleado.create({
        id_persona: nuevaPersona.id_persona,
        codigo_empleado,
        fecha_contratacion,
        id_estado
      });
  
      res.status(201).json({ mensaje: 'Empleado creado con éxito', empleado: nuevoEmpleado });
    } catch (error) {
      console.error('Error al crear empleado:', error);
      res.status(500).json({ error: 'Error al crear empleado' });
    }
  };
// Actualizar un empleado
exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    await empleado.update(req.body);
    res.json(empleado);
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

// Eliminar un empleado
exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    await empleado.destroy();
    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
