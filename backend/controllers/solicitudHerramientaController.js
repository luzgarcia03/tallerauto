const SolicitudHerramienta = require('../models/solicitudHerramienta');

exports.obtenerSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudHerramienta.findAll();
    res.json(solicitud);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
};

exports.obtenerSolicitudPorId = async (req, res) => {
  try {
    const solicitud = await SolicitudHerramienta.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(solicitud);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener Solicitud' });
  }
};

exports.crearSolicitud = async (req, res) => {
  try {
    const nueva = await SolicitudHerramienta.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear Solicitud' });
  }
};

exports.actualizarSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudHerramienta.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await solicitud.update(req.body);
    res.json(solicitud);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar Solicitud' });
  }
};

exports.eliminarSolicitud = async (req, res) => {
  try {
    const solicitud = await SolicitudHerramienta.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    await solicitud.destroy();
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar Solicitud' });
  }
};
