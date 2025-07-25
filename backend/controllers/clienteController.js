const Cliente = require('../models/cliente');
const Persona = require('../models/persona');
const Estado = require('../models/estado');
const bcrypt = require('bcrypt');

// GET /api/clientes - obtener todos los clientes con su persona y su estado
exports.obtenerClientes = async (req, res) => {
  try {
    console.log("📥 Entrando a obtenerClientes");

    const clientes = await Cliente.findAll({
      include: [
        {
          model: Persona,
          as: 'persona',
          include: [
            {
              model: Estado,
              as: 'estado'
            }
          ]
        }
      ]
    });

    console.log("📦 Clientes encontrados:", clientes.length);

    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};



// POST /api/clientes - crear persona y cliente
exports.crearCliente = async (req, res) => {
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento,
      telefono,
      email,
      direccion,
      municipio,
      departamento,
      zona,
      id_estado,
      password,
      nit,
      dpi,
      puntos_fidelidad
    } = req.body;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Crear persona
    const nuevaPersona = await Persona.create({
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      fecha_nacimiento,
      telefono,
      email,
      direccion,
      municipio,
      departamento,
      zona,
      fecha_registro: new Date(),
      id_estado,
      password: hashedPassword
    });

    // 2. Crear cliente relacionado
    const nuevoCliente = await Cliente.create({
      persona_id: nuevaPersona.id_persona,
      nit,
      dpi,
      puntos_fidelidad
    });

    res.status(201).json({ mensaje: 'Cliente creado con éxito', cliente: nuevoCliente });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

exports.actualizarCliente = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        telefono,
        email,
        direccion,
        municipio,
        departamento,
        zona,
        id_estado,
        nit,
        dpi,
        puntos_fidelidad
      } = req.body;
  
      // 1. Buscar el cliente por ID
      const cliente = await Cliente.findByPk(id, { include: ['persona'] });
  
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      // 2. Actualizar persona relacionada
      await cliente.persona.update({
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        telefono,
        email,
        direccion,
        municipio,
        departamento,
        zona,
        id_estado
      });
  
      // 3. Actualizar cliente
      await cliente.update({
        nit,
        dpi,
        puntos_fidelidad
      });
  
      res.json({ mensaje: 'Cliente actualizado correctamente' });
  
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  };
  // ✅ Correcto - separado y fuera
exports.eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Cliente.destroy({ where: { id_cliente: id } });
    if (resultado === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error interno' });
  }
};
exports.obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id, {
      include: [
        {
          model: Persona,
          as: 'persona',
          include: [
            {
              model: Estado,
              as: 'estado'
            }
          ]
        }
      ]
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};
