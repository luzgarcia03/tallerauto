const Estado = require('../models/estado');

// Obtener todos los estados
exports.obtenerEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.json(estados);
  } catch (error) {
    console.error('Error al obtener estados:', error);
    res.status(500).json({ error: 'Error al obtener estados' });
  }
};

// Obtener estado por ID
exports.obtenerEstadoPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const estado = await Estado.findByPk(id);
  
      if (!estado) {
        return res.status(404).json({ error: 'Estado no encontrado' });
      }
  
      res.json(estado);
    } catch (error) {
      console.error('Error al obtener estado por ID:', error);
      res.status(500).json({ error: 'Error al obtener estado' });
    }
  };
// Crear nuevo estado
exports.crearEstado = async (req, res) => {
  try {
    const nuevoEstado = await Estado.create(req.body);
    res.status(201).json(nuevoEstado);
  } catch (error) {
    console.error('Error al crear estado:', error);
    res.status(500).json({ error: 'Error al crear estado' });
  }
};

// Actualizar estado
exports.actualizarEstado = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });

    await estado.update(req.body);
    res.json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

// Eliminar estado
exports.eliminarEstado = async (req, res) => {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });

    await estado.destroy();
    res.json({ mensaje: 'Estado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar estado' });
  }
};
