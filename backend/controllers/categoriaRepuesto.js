const CategoriaRepuesto = require('../models/categoriaRepuesto');

exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaRepuesto.findAll();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

exports.obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await CategoriaRepuesto.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};

exports.crearCategoria = async (req, res) => {
  try {
    const nueva = await CategoriaRepuesto.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

exports.actualizarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaRepuesto.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    await categoria.update(req.body);
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

exports.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaRepuesto.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    await categoria.destroy();
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};
