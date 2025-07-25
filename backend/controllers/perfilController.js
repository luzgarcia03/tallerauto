const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const bcrypt = require('bcrypt');

// Obtener perfil
exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: { id_usuario: req.user.id },
      include: [{ model: Persona, as: 'persona' }]
    });

    if (!usuario || !usuario.persona) {
      return res.status(404).json({ mensaje: 'Datos no encontrados' });
    }

    res.json({ persona: usuario.persona }); // ✅ Esto es lo que espera el frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener perfil' });
  }
};


// Actualizar datos personales
exports.actualizarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    await Persona.update(req.body, { where: { id_persona: usuario.id_persona } });

    res.json({ mensaje: 'Perfil actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar perfil' });
  }
};

// Cambiar contraseña
exports.actualizarContrasenia = async (req, res) => {
  try {
    const { actual, nueva, confirmar } = req.body;
    const usuario = await Usuario.findByPk(req.user.id);

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const valida = await bcrypt.compare(actual, usuario.password);
    if (!valida) return res.status(400).json({ mensaje: 'Contraseña actual incorrecta' });

    if (nueva !== confirmar)
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden' });

    const nuevaHash = await bcrypt.hash(nueva, 10);
    usuario.password = nuevaHash;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar contraseña' });
  }
};
