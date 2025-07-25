const TipoVehiculo = require('../models/tipoVehiculo');

// Obtener todos los tipos de vehículo
exports.obtenerTiposVehiculo = async (req, res) => {
  try {
    const tipos = await TipoVehiculo.findAll();
    res.json(tipos);
  } catch (err) {
    console.error('Error al obtener tipos de vehículo:', err);
    res.status(500).json({ error: 'Error al obtener tipos de vehículo' });
  }
};

// Obtener un tipo por ID
exports.obtenerTipoVehiculoPorId = async (req, res) => {
  try {
    const tipo = await TipoVehiculo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar tipo de vehículo' });
  }
};

// Crear nuevo tipo
exports.crearTipoVehiculo = async (req, res) => {
  try {
    const nuevo = await TipoVehiculo.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tipo de vehículo' });
  }
};

// Actualizar tipo
exports.actualizarTipoVehiculo = async (req, res) => {
  try {
    const tipo = await TipoVehiculo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    await tipo.update(req.body);
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tipo de vehículo' });
  }
};

// Eliminar tipo
exports.eliminarTipoVehiculo = async (req, res) => {
  try {
    const tipo = await TipoVehiculo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo de vehículo no encontrado' });
    await tipo.destroy();
    res.json({ mensaje: 'Tipo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tipo de vehículo' });
  }
};
