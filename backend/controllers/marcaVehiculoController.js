const MarcaVehiculo = require('../models/marcaVehiculo');

// Obtener todas las marcas de vehículo
exports.obtenerMarcasVehiculo = async (req, res) => {
  try {
    const marcas = await MarcaVehiculo.findAll();
    res.json(marcas);
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ error: 'Error al obtener marcas de vehículo' });
  }
};

// Obtener una marca por ID
exports.obtenerMarcaVehiculoPorId = async (req, res) => {
  try {
    const marca = await MarcaVehiculo.findByPk(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: 'Marca de vehículo no encontrada' });
    }
    res.json(marca);
  } catch (error) {
    console.error('Error al buscar marca:', error);
    res.status(500).json({ error: 'Error al buscar la marca' });
  }
};

// Crear una nueva marca
exports.crearMarcaVehiculo = async (req, res) => {
  try {
    const nueva = await MarcaVehiculo.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ error: 'Error al crear la marca de vehículo' });
  }
};

// Actualizar una marca existente
exports.actualizarMarcaVehiculo = async (req, res) => {
  try {
    const marca = await MarcaVehiculo.findByPk(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    await marca.update(req.body);
    res.json(marca);
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({ error: 'Error al actualizar la marca de vehículo' });
  }
};

// Eliminar una marca
exports.eliminarMarcaVehiculo = async (req, res) => {
  try {
    const marca = await MarcaVehiculo.findByPk(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }
    await marca.destroy();
    res.json({ mensaje: 'Marca eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({ error: 'Error al eliminar la marca' });
  }
};
