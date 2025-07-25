const Diagnostico = require('../models/repuesto');
const Estado = require('../models/estado');
const Empleado = require('../models/empleado');
const Inspeccion = require('../models/inspeccion');

exports.obtenerDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await Diagnostico.findAll({
      include: ['empleado', 'estado', 'inspeccion'],
    });
    res.json(diagnosticos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener diagnosticos' });
  }
};

exports.obtenerDiagnosticoPorId = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id, {
      include: [
        { model: Estado, as: 'estado' },
        { model: Empleado, as: 'empleado' },
        { model: Inspeccion, as: 'inspeccion' },
      ],
    });
    if (!diagnostico) return res.status(404).json({ error: 'No encontrado' });
    res.json(diagnostico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener diagnostico por ID' });
  }
};

exports.crearDiagnostico = async (req, res) => {
  try {
    const nuevo = await Diagnostico.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear diagnostico' });
  }
};

exports.actualizarDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (!diagnostico) return res.status(404).json({ error: 'No encontrado' });
    await diagnostico.update(req.body);
    res.json(diagnostico);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar diagnostico' });
  }
};

exports.eliminarDiagnostico = async (req, res) => {
  try {
    const diagnostico = await Diagnostico.findByPk(req.params.id);
    if (!diagnostico) return res.status(404).json({ error: 'No encontrado' });
    await diagnostico.destroy();
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar diagnostico' });
  }
};
