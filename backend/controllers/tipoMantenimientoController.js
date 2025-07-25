const TipoMantenimiento = require('../models/tipoMantenimiento');

// Obtener todos los tipos de mantenimiento
exports.obtenerTiposMantenimiento = async (req, res) => {
    try {
      const tipos = await TipoMantenimiento.findAll();
      res.json(tipos);
    } catch (err) {
      console.error('Error al obtener tipos de Mantenimiento:', err);
      res.status(500).json({ error: 'Error al obtener tipos de Mantenimiento' });
    }
  };

  // Obtener un tipo por ID
exports.obtenerTipoMantenimientoPorId = async (req, res) => {
    try {
      const tipo = await TipoMantenimiento.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de vehículo no Mantenimiento' });
      res.json(tipo);
    } catch (err) {
      res.status(500).json({ error: 'Error al buscar tipo de Mantenimiento' });
    }
  };

  // Crear nuevo tipo
exports.crearTipoMantenimiento = async (req, res) => {
    try {
      const nuevo = await TipoMantenimiento.create(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(500).json({ error: 'Error al crear tipo de Mantenimiento' });
    }
  };

  // Actualizar tipo
exports.actualizarTipoMantenimiento = async (req, res) => {
    try {
      const tipo = await TipoMantenimiento.findByPk(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo de Mantenimiento no encontrado' });
      await tipo.update(req.body);
      res.json(tipo);
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar tipo de Mantenimiento' });
    }
  };
  
// Eliminar tipo
exports.eliminarTipoMantenimiento = async (req, res) => {
  try {
    const tipo = await TipoMantenimiento.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de Mantenimiento no encontrado' });

    await tipo.destroy();
    res.json({ mensaje: 'Tipo de Mantenimiento eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar tipo de Mantenimiento:', err);
    res.status(500).json({ error: 'Error al eliminar tipo de Mantenimiento' });
  }
};
