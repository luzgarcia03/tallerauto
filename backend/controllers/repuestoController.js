const Repuesto = require('../models/repuesto');
const Estado = require('../models/estado');
const CategoriaRepuesto = require('../models/categoriaRepuesto');

exports.obtenerRepuestos = async (req, res) => {
  try {
    const repuestos = await Repuesto.findAll({
      include: ['categoria', 'estado']
    });
    res.json(repuestos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener repuestos' });
  }
};

exports.obtenerRepuestoPorId = async (req, res) => {
    try {
      const repuesto = await Repuesto.findByPk(req.params.id, {
        include: [
          { model: Estado, as: 'estado' },
          { model: CategoriaRepuesto, as: 'categoria' }
        ]
      });
      if (!repuesto) return res.status(404).json({ error: 'No encontrado' });
      res.json(repuesto);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener repuesto por ID' });
    }
  };
  

exports.crearRepuesto = async (req, res) => {
  try {
    const nuevo = await Repuesto.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear repuesto' });
  }
};

exports.actualizarRepuesto = async (req, res) => {
  try {
    const repuesto = await Repuesto.findByPk(req.params.id);
    if (!repuesto) return res.status(404).json({ error: 'No encontrado' });
    await repuesto.update(req.body);
    res.json(repuesto);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar repuesto' });
  }
};

exports.eliminarRepuesto = async (req, res) => {
  try {
    const repuesto = await Repuesto.findByPk(req.params.id);
    if (!repuesto) return res.status(404).json({ error: 'No encontrado' });
    await repuesto.destroy();
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar repuesto' });
  }
};
