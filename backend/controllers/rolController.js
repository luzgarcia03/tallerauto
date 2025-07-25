const Rol = require('../models/rol');
const RolPermiso = require('../models/rol_permiso');

// GET /api/roles/:id → obtener nombre del rol y sus permisos
exports.obtenerRolConPermisos = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }

    const permisos = await RolPermiso.findAll({
      where: { id_rol: id }
    });

    const listaPermisos = permisos.map(p => p.id_permiso);
    if (listaPermisos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron permisos para este rol' });
    }
    res.json({
      nombre_rol: rol.nombre_rol,
      permisos: listaPermisos
    });
  } catch (err) {
    console.error('Error al obtener rol:', err);
    res.status(500).json({ error: 'Error interno' });
  }
};

// POST /api/roles/:id/permisos → asignar un permiso al rol
exports.asignarPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const { permiso } = req.body;

    await RolPermiso.create({ id_rol: id, permiso });
    res.status(201).json({ mensaje: 'Permiso asignado con éxito' });
  } catch (err) {
    console.error('Error al asignar permiso:', err);
    res.status(500).json({ error: 'Error al asignar permiso' });
  }
};

// DELETE /api/roles/:id/permisos → quitar un permiso al rol
exports.removerPermiso = async (req, res) => {
  try {
    const { id } = req.params;
    const { permiso } = req.body;

    await RolPermiso.destroy({
      where: { id_rol: id, permiso }
    });

    res.json({ mensaje: 'Permiso removido con éxito' });
  } catch (err) {
    console.error('Error al eliminar permiso:', err);
    res.status(500).json({ error: 'Error al eliminar permiso' });
  }
};
