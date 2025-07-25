const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database'); 

// Rutas
const categoriaRepuestoRoutes = require('./routes/categoriaRepuesto');
const repuestoRoutes = require('./routes/repuestoRoutes');
const marcaVehiculoRoutes = require('./routes/marcaVehiculoRoutes');
const tipoVehiculoRoutes = require('./routes/tipoVehiculoRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const tipoMantenimientoRoutes = require('./routes/tipoMantenimientoRoutes');
const estadoPagoRoutes = require('./routes/estadoPagoRoutes');
const estadoGeneralRoutes = require('./routes/estadoGeneralRoutes');
const categoriaHerramientaRoutes = require('./routes/categoriaHerramientaRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const solicitudHerramientaRoutes = require('./routes/solicitudHerramientaRoutes');
const permisoRoutes = require('./routes/permiso.routes');
const rolRoutes = require('./routes/rol.routes');

const app = express();


app.use(cors({
  origin: [  'http://192.168.1.33:82',
    'http://192.168.1.33:3000', 'http://localhost:3000', 'http://169.254.121.42:82',
  'http://127.0.0.1:3000', ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/estados', require('./routes/estadoRoutes'));
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/categorias-repuesto', categoriaRepuestoRoutes);
app.use('/api/repuestos', repuestoRoutes);
app.use('/api/marcas-vehiculo', marcaVehiculoRoutes);
app.use('/api/tipos-vehiculo', tipoVehiculoRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/tipos-mantenimiento', tipoMantenimientoRoutes);
app.use('/api/estados-pago', estadoPagoRoutes);
app.use('/api/perfil', require('./routes/perfilRoutes'));
app.use('/api/estado-general', estadoGeneralRoutes);
app.use('/api/categorias-herramienta', categoriaHerramientaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/solicitud-herramienta', solicitudHerramientaRoutes);
app.use('/api/permisos', permisoRoutes);
app.use('/api/roles', rolRoutes);


app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Escuchar en 0.0.0.0 (no solo localhost)
app.listen(5000, '0.0.0.0', async () => {
  try {
    await sequelize.authenticate(); // Conectar a MySQL
    console.log('🟢 Conectado a MySQL correctamente.');
    console.log('🚀 Servidor backend corriendo en http://0.0.0.0:5000');
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
  }
});
