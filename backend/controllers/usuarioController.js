const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const Rol = require('../models/rol');

// GET /api/usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        { model: Persona, as: 'persona' },
        { model: Rol, as: 'rol' }
      ]
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


// POST /api/usuarios
exports.crearUsuario = async (req, res) => {
  const t = await require('../config/database').transaction();
  try {
    const { persona, username, password, rol_id, estado_usuario_id } = req.body;

    // Crear persona primero
    const nuevaPersona = await Persona.create(persona, { transaction: t });

    // Crear usuario asociado a la persona
    const nuevoUsuario = await Usuario.create({
      id_persona: nuevaPersona.id_persona,
      username,
      password,
      rol_id,
      estado_usuario_id
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ mensaje: 'Usuario y persona creados correctamente', usuario: nuevoUsuario });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};


// GET /api/usuarios/:id
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [
        { model: Persona, as: 'persona' },
        { model: Rol, as: 'rol' }
      ]
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// PUT /api/usuarios/:id
exports.actualizarUsuario = async (req, res) => {
  const t = await require('../config/database').transaction();
  try {
    const { persona, username, password, rol_id, estado_usuario_id } = req.body;

    const usuario = await Usuario.findByPk(req.params.id, { transaction: t });
    if (!usuario) {
      await t.rollback();
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar persona asociada
    await Persona.update(persona, {
      where: { id_persona: usuario.id_persona },
      transaction: t
    });

    // Actualizar usuario
    await usuario.update({ username, password, rol_id, estado_usuario_id }, { transaction: t });

    await t.commit();
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    await t.rollback();
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};
// DELETE /api/usuarios/:id
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    await usuario.destroy(); // También puedes eliminar la persona si deseas
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
