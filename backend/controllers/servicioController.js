const Servicio = require('../models/servicio');
const Estado = require('../models/estado');

exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll({
      include: ['estado'],
    });
    res.json(servicios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
};

exports.obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: [{ model: Estado, as: 'estado' }],
    });
    if (!servicio) return res.status(404).json({ error: 'No encontrado' });
    res.json(servicio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener servicio por ID' });
  }
};

exports.crearServicio = async (req, res) => {
  try {
    const nuevo = await Servicio.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear servicio' });
  }
};

exports.actualizarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'No encontrado' });
    await servicio.update(req.body);
    res.json(servicio);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar servicio' });
  }
};

exports.eliminarServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'No encontrado' });
    await servicio.destroy();
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar servicio' });
  }
};
