const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Persona = require('../models/persona');
const compararPassword = require('../utils/compararPassword');
const generarToken = require('../utils/generarToken');
const obtenerPermisosPorRol = require('../utils/obtenerPermisos');

const secretKey = process.env.JWT_SECRET || 'claveSuperSecreta';

// Registro (sin cambios)
exports.registrar = async (req, res) => {
  try {
    const { username, password, estado_usuario_id, rol_id, persona } = req.body;

    const nuevaPersona = await Persona.create(persona);
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      username,
      password: hashedPassword,
      id_persona: nuevaPersona.id_persona,
      estado_usuario_id,
      rol_id
    });

    res.status(201).json({ usuario: nuevoUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al registrar' });
  }
};

// Login mejorado con datos personales en el token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ where: { username } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const isValid = compararPassword(usuario.password, password);
    if (!isValid) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const persona = await Persona.findByPk(usuario.id_persona);
    const permisos = await obtenerPermisosPorRol(usuario.rol_id);

    const token = generarToken({
      id: usuario.id_usuario,
      username: usuario.username,
      rol_id: usuario.rol_id,
      primer_nombre: persona.primer_nombre,
      primer_apellido: persona.primer_apellido,
      permisos
    });
    
    res.json({ token, usuario,  permisos  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el login' });
  }
};
