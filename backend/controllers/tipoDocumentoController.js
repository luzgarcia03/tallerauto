const TipoDocumento = require('../models/tipoDocumento');

exports.obtenerTipoDocumento = async (req, res) => {
  try {
    const tipoDocumentos = await tipoDocumento.findAll();
    res.json(tipoDocumentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tipo de documento' });
  }
};

exports.obtenerTipoDocumentoPorId = async (req, res) => {
  try {
    const tipoDocumento = await tipoDocumento.findByPk(req.params.id);
    if (!tipoDocumento) return res.status(404).json({ error: 'tipo de documento no encontrada' });
    res.json(tipoDocumento);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};

exports.crearTipoDocumento = async (req, res) => {
  try {
    const nueva = await tipoDocumento.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tipo de documento' });
  }
};

exports.actualizarTipoDocumento = async (req, res) => {
  try {
    const tipoDocumento = await tipoDocumento.findByPk(req.params.id);
    if (!tipoDocumento) return res.status(404).json({ error: 'tipo de documento no encontrada' });
    await tipoDocumento.update(req.body);
    res.json(tipoDocumento);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tipo de documento' });
  }
};

exports.eliminarTipoDocumento = async (req, res) => {
  try {
    const tipoDocumento = await tipoDocumento.findByPk(req.params.id);
    if (!tipoDocumento) return res.status(404).json({ error: 'tipo de documento no encontrada' });
    await tipoDocumento.destroy();
    res.json({ mensaje: 'tipo de documento eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tipo de documento' });
  }
};
